# ECS Task Execution Role
# Grants ECS permission to pull images from ECR and write to CloudWatch Logs.
resource "aws_iam_role" "ecs_execution" {
  name = "${var.app_name}-execution"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# ECS Task Role
# Permissions that the running container gets at runtime.
# Add policies here if your app needs to call AWS services (S3, SES, etc.)
resource "aws_iam_role" "ecs_task" {
  name = "${var.app_name}-task"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}
