variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Name of the SSH key pair"
  type        = string
}

variable "dockerhub_backend_image" {
  description = "DockerHub backend image"
  type        = string
  default     = "eg244991/event-planner-backend:latest"
}

variable "dockerhub_frontend_image" {
  description = "DockerHub frontend image"
  type        = string
  default     = "eg244991/event-planner-frontend:latest"
}
