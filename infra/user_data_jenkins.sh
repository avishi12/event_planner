#!/bin/bash
set -e

# Log all output
exec > >(tee /var/log/user-data.log)
exec 2>&1

echo "Starting Jenkins Server initialization..."

# Update system packages
echo "Updating system packages..."
dnf update -y

# Install Docker
echo "Installing Docker..."
dnf install -y docker
systemctl start docker
systemctl enable docker

# Add ec2-user to docker group
usermod -aG docker ec2-user

# Install Docker Compose
echo "Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose

# Install Java for Jenkins
echo "Installing Java 17 for Jenkins..."
dnf install -y java-17-amazon-corretto-headless

# Install Jenkins
echo "Installing Jenkins..."
curl -o /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo || {
    echo "Repo download failed, creating manually..."
    cat > /etc/yum.repos.d/jenkins.repo <<'JENKINSREPO'
[jenkins]
name=Jenkins-stable
baseurl=https://pkg.jenkins.io/redhat-stable
gpgcheck=1
gpgkey=https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
JENKINSREPO
}
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
dnf install -y jenkins --nogpgcheck

# Add jenkins user to docker group
usermod -aG docker jenkins

# Start Jenkins
systemctl start jenkins
systemctl enable jenkins

# Install Git (needed for Jenkins)
echo "Installing Git..."
dnf install -y git

# Wait for Jenkins to fully start
echo "Waiting for Jenkins to start..."
sleep 60
while ! systemctl is-active --quiet jenkins; do
    echo "Jenkins not ready yet, waiting..."
    sleep 10
done
echo "Jenkins is running!"

# Verify installations
echo "Docker version:"
docker --version
echo "Docker Compose version:"
docker-compose --version
echo "Java version:"
java -version
echo "Jenkins status:"
systemctl status jenkins --no-pager

# Get Jenkins initial admin password
echo "Waiting for Jenkins to generate initial password..."
sleep 30
JENKINS_PASSWORD=$(cat /var/lib/jenkins/secrets/initialAdminPassword 2>/dev/null || echo "Not ready yet - check in 1-2 minutes")

echo "========================================="
echo "Jenkins Server initialization complete!"
echo "========================================="
echo ""
echo "Jenkins URL:"
echo "  http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8080"
echo ""
echo "Jenkins Initial Admin Password:"
echo "  $JENKINS_PASSWORD"
echo ""
echo "========================================="
