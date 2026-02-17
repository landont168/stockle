# Terraform Infrastructure — Stockle Backend

This directory contains Terraform configuration to deploy the Stockle backend to **AWS ECS Fargate** behind an Application Load Balancer.

## Architecture

```
Internet → ALB (port 80) → ECS Fargate Task (port 4000) → MongoDB Atlas
```

**Resources created:**
- ECR repository (container image registry)
- ECS cluster + Fargate service + task definition
- Application Load Balancer + target group + listener
- Security groups (ALB accepts HTTP; ECS only accepts traffic from ALB)
- IAM roles (task execution + task role)
- CloudWatch log group (14-day retention)

**Resources NOT managed here (set up manually):**
- MongoDB Atlas cluster (external, connection string passed as env var)
- S3 bucket for Terraform remote state (one-time setup)
- Route 53 / custom domain (optional)
- ACM certificate for HTTPS (optional)

## Prerequisites

1. **AWS CLI** configured with credentials (`aws configure`)
2. **Terraform** >= 1.5 installed ([install guide](https://developer.hashicorp.com/terraform/install))
3. **Docker** for building and pushing images

## Quick Start

```bash
# 1. Set up your variables
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your MongoDB URI and JWT secret

# 2. Initialize Terraform (downloads the AWS provider)
terraform init

# 3. Preview what will be created
terraform plan

# 4. Create all resources
terraform apply
# Type "yes" when prompted. Takes ~3 minutes.

# 5. Note the outputs
# alb_url      = "http://stockle-backend-xxxx.us-east-1.elb.amazonaws.com"
# ecr_repo_url = "123456789.dkr.ecr.us-east-1.amazonaws.com/stockle-backend"
```

## Deploying Your App

After `terraform apply` creates the infrastructure, push your Docker image:

```bash
# Get the ECR repo URL from Terraform output
ECR_URL=$(terraform output -raw ecr_repo_url)

# Authenticate Docker with ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin "$ECR_URL"

# Build the backend image
docker build -t stockle-backend ../backend

# Tag and push
docker tag stockle-backend:latest "$ECR_URL:latest"
docker push "$ECR_URL:latest"

# Force ECS to pull the new image
aws ecs update-service \
  --cluster stockle-backend \
  --service stockle-backend \
  --force-new-deployment
```

The ECS service will perform a rolling deployment — the old task stays running until the new one passes health checks.

## Common Operations

### See what Terraform manages
```bash
terraform state list
```

### Update infrastructure (e.g., change memory/CPU, add env vars)
```bash
# Edit the .tf files, then:
terraform plan    # review changes
terraform apply   # apply changes
```

### View container logs
```bash
aws logs tail /ecs/stockle-backend --follow
```

### Tear everything down
```bash
terraform destroy
# Type "yes" when prompted. Removes ALL resources.
```

### Scale up/down
Edit `desired_count` in `terraform.tfvars` or pass it directly:
```bash
terraform apply -var="desired_count=2"
```

## File Overview

| File | Purpose |
|------|---------|
| `main.tf` | Provider config, Terraform version, remote state backend |
| `variables.tf` | Input variables (region, app name, secrets, etc.) |
| `outputs.tf` | Values printed after apply (ALB URL, ECR URL) |
| `ecr.tf` | ECR repository + lifecycle policy for cleanup |
| `ecs.tf` | ECS cluster, task definition, Fargate service |
| `alb.tf` | Load balancer, target group, HTTP listener |
| `networking.tf` | Default VPC data sources, security groups |
| `iam.tf` | Task execution role + task role |
| `terraform.tfvars.example` | Template for your secrets (copy to `terraform.tfvars`) |

## Next Steps / Improvements

### Add HTTPS
1. Register a domain or use an existing one in Route 53
2. Create an ACM certificate (`aws_acm_certificate` resource)
3. Add an HTTPS listener on port 443 and redirect HTTP to HTTPS:
   ```hcl
   resource "aws_lb_listener" "https" {
     load_balancer_arn = aws_lb.main.arn
     port              = 443
     protocol          = "HTTPS"
     ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
     certificate_arn   = aws_acm_certificate.main.arn

     default_action {
       type             = "forward"
       target_group_arn = aws_lb_target_group.main.arn
     }
   }
   ```

### Use Secrets Manager instead of env vars
Replace plain `environment` with `secrets` in the task definition:
```hcl
# In ecs.tf, replace the environment block with:
secrets = [
  { name = "MONGODB_URI", valueFrom = aws_secretsmanager_secret.mongodb.arn },
  { name = "SECRET",      valueFrom = aws_secretsmanager_secret.jwt.arn },
]
```
This keeps secrets out of the ECS console and Terraform state.

### Enable remote state
1. Create the S3 bucket: `aws s3api create-bucket --bucket stockle-terraform-state --region us-east-1`
2. Uncomment the `backend "s3"` block in `main.tf`
3. Run `terraform init` to migrate state

### Add a health check endpoint
Add a lightweight `/health` route to the backend instead of using `/api/stocks`:
```typescript
app.get('/health', (_req, res) => res.status(200).send('ok'));
```
Then update the `health_check.path` in `alb.tf`.

### CI/CD with GitHub Actions
Automate the build-push-deploy cycle:
```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]
    paths: [backend/**]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - uses: aws-actions/amazon-ecr-login@v2
      - run: |
          docker build -t $ECR_URL:latest backend/
          docker push $ECR_URL:latest
          aws ecs update-service --cluster stockle-backend --service stockle-backend --force-new-deployment
```

## References

- [Terraform AWS Provider Docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [ECS Task Definition Parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html)
- [Fargate Pricing](https://aws.amazon.com/fargate/pricing/) — 0.25 vCPU + 512MB costs ~$9/month running 24/7
- [Terraform State Management](https://developer.hashicorp.com/terraform/language/state)
- [Terraform Best Practices](https://developer.hashicorp.com/terraform/cloud-docs/recommended-practices)
