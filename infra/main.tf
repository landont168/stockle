terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Uncomment after creating the S3 bucket for remote state:
  #   aws s3api create-bucket --bucket stockle-terraform-state --region us-east-1
  #
  # backend "s3" {
  #   bucket = "stockle-terraform-state"
  #   key    = "backend/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "aws" {
  region = var.aws_region
}
