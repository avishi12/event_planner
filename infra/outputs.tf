# App Server Outputs
output "app_instance_id" {
  description = "ID of the App EC2 instance"
  value       = aws_instance.app_server.id
}

output "app_elastic_ip" {
  description = "Elastic IP address for App Server"
  value       = aws_eip.app_eip.public_ip
}

output "frontend_url" {
  description = "URL to access the frontend"
  value       = "http://${aws_eip.app_eip.public_ip}:3000"
}

output "backend_url" {
  description = "URL to access the backend API"
  value       = "http://${aws_eip.app_eip.public_ip}:4000"
}

output "app_ssh_command" {
  description = "SSH command to connect to App Server"
  value       = "ssh -i ${var.key_name}.pem ec2-user@${aws_eip.app_eip.public_ip}"
}

# Jenkins Server Outputs
output "jenkins_instance_id" {
  description = "ID of the Jenkins EC2 instance"
  value       = aws_instance.jenkins_server.id
}

output "jenkins_elastic_ip" {
  description = "Elastic IP address for Jenkins Server"
  value       = aws_eip.jenkins_eip.public_ip
}

output "jenkins_url" {
  description = "URL to access Jenkins"
  value       = "http://${aws_eip.jenkins_eip.public_ip}:8080"
}

output "jenkins_ssh_command" {
  description = "SSH command to connect to Jenkins Server"
  value       = "ssh -i ${var.key_name}.pem ec2-user@${aws_eip.jenkins_eip.public_ip}"
}

# Summary
output "deployment_summary" {
  description = "Quick reference for all services"
  value = <<-EOT
  
  ========================================
  Event Planner - 2 Instance Setup
  ========================================
  
  App Server:
    IP: ${aws_eip.app_eip.public_ip}
    Frontend: http://${aws_eip.app_eip.public_ip}:3000
    Backend:  http://${aws_eip.app_eip.public_ip}:4000
    SSH: ssh -i ${var.key_name}.pem ec2-user@${aws_eip.app_eip.public_ip}
  
  Jenkins Server:
    IP: ${aws_eip.jenkins_eip.public_ip}
    Jenkins: http://${aws_eip.jenkins_eip.public_ip}:8080
    SSH: ssh -i ${var.key_name}.pem ec2-user@${aws_eip.jenkins_eip.public_ip}
  
  Next Steps:
    1. Get Jenkins password: ssh to Jenkins server, run:
       sudo cat /var/lib/jenkins/secrets/initialAdminPassword
    2. Open Jenkins and complete setup
    3. Configure Jenkins to deploy to App Server
  
  ========================================
  EOT
}
