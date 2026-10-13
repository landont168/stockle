import { metrics, SpanStatusCode, trace } from '@opentelemetry/api'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { MongoDBInstrumentation } from '@opentelemetry/instrumentation-mongodb'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { AggregationType, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

const serviceName = process.env.OTEL_SERVICE_NAME ?? 'stockle-backend'
const otlpEndpoint = (process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318')
  .replace(/\/$/, '')
const telemetryEnabled = process.env.OTEL_SDK_DISABLED !== 'true'

const metricExporter = new OTLPMetricExporter({
  url: `${otlpEndpoint}/v1/metrics`,
})

const traceExporter = new OTLPTraceExporter({
  url: `${otlpEndpoint}/v1/traces`,
})

// OTLP metrics are exported every 5 seconds
const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 5_000,
})

// SDK aggregates metrics from all instrumented libraries and exports them to OTLP.
const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: serviceName,
  }),
  metricReaders: [metricReader],
  traceExporter,
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    // Query values are intentionally excluded to avoid collecting user data.
    new MongoDBInstrumentation({ enhancedDatabaseReporting: false }),
  ],
  views: [
    {
      instrumentName: 'stockle.http.request.duration.seconds',
      aggregation: {
        type: AggregationType.EXPLICIT_BUCKET_HISTOGRAM,
        options: {
          // Boundaries are seconds: 5 ms through 5 seconds.
          boundaries: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
        },
      },
    },
  ],
})

if (telemetryEnabled) {
  sdk.start()
}

const meter = metrics.getMeter(serviceName)
const tracer = trace.getTracer(serviceName)

// Mimir 3.2 keeps incoming OTLP names verbatim apart from replacing dots.
// Include Prometheus suffixes explicitly so the query contract stays stable.
const httpRequests = meter.createCounter('stockle.http.requests.total', {
  description: 'Completed Stockle HTTP requests',
  unit: '{request}',
})

const httpRequestDuration = meter.createHistogram('stockle.http.request.duration.seconds', {
  description: 'Stockle HTTP request duration',
  unit: 's',
})

const gamesCompleted = meter.createCounter('stockle.games.completed.total', {
  description: 'Completed Stockle games',
  unit: '{game}',
})

interface HttpRequestMeasurement {
  method: string
  route: string
  statusCode: number
  durationSeconds: number
}

export const recordHttpRequest = ({
  method,
  route,
  statusCode,
  durationSeconds,
}: HttpRequestMeasurement) => {
  const attributes = {
    method,
    route,
    status_code: String(statusCode),
  }

  httpRequests.add(1, attributes)
  httpRequestDuration.record(durationSeconds, attributes)
}

export const recordCompletedGame = (won: boolean) => {
  gamesCompleted.add(1, { outcome: won ? 'win' : 'loss' })
}

export const traceGameResultUpdate = async <T>(
  won: boolean,
  update: () => Promise<T>,
): Promise<T> => tracer.startActiveSpan(
  'stockle.game_result.update',
  {
    attributes: {
      'stockle.game.outcome': won ? 'win' : 'loss',
    },
  },
  async (span) => {
    try {
      const result = await update()
      span.setStatus({ code: SpanStatusCode.OK })
      return result
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : 'Game result update failed',
      })

      if (error instanceof Error) {
        span.recordException(error)
      }

      throw error
    } finally {
      span.end()
    }
  },
)

export const shutdownTelemetry = async () => {
  if (telemetryEnabled) {
    await sdk.shutdown()
  }
}
