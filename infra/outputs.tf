output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.event_planner.id
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.event_planner.public_ip
}

output "frontend_url" {
  description = "URL to access the frontend"
  value       = "http://${aws_instance.event_planner.public_ip}:3000"
}

output "backend_url" {
  description = "URL to access the backend API"
  value       = "http://${aws_instance.event_planner.public_ip}:4000"
}

output "ssh_command" {
  description = "SSH command to connect to the instance"
  value       = "ssh -i ${var.key_name}.pem ec2-user@${aws_instance.event_planner.public_ip}"
}
