import { metrics } from '@opentelemetry/api'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
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

export const shutdownTelemetry = async () => {
  if (telemetryEnabled) {
    await sdk.shutdown()
  }
}
