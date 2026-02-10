#!/bin/bash
set -e

# Log all output
exec > >(tee /var/log/user-data.log)
exec 2>&1

echo "Starting EC2 initialization script..."

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

# Verify installations
echo "Docker version:"
docker --version
echo "Docker Compose version:"
docker-compose --version

# Create deployment directory
echo "Creating deployment directory..."
mkdir -p /home/ec2-user/event-planner-deploy
cd /home/ec2-user/event-planner-deploy

# Create docker-compose.prod.yaml
echo "Creating docker-compose.prod.yaml..."
cat > docker-compose.prod.yaml <<'EOF'
services:
  frontend:
    image: eg244991/event-planner-frontend:latest
    container_name: frontend_c
    ports:
      - "3000:80"
    restart: unless-stopped

  backend:
    image: eg244991/event-planner-backend:latest
    container_name: backend_c
    ports:
      - "4000:4000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/devops
      - JWT_SECRET=production_jwt_secret_change_me
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:latest
    container_name: mongo_c
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped

volumes:
  mongo-data:
EOF

# Set proper ownership
chown -R ec2-user:ec2-user /home/ec2-user/event-planner-deploy

# Create startup script for auto-deployment
echo "Creating startup script..."
cat > /home/ec2-user/start-event-planner.sh <<'EOF'
#!/bin/bash
cd /home/ec2-user/event-planner-deploy
docker-compose -f docker-compose.prod.yaml pull
docker-compose -f docker-compose.prod.yaml up -d
EOF

chmod +x /home/ec2-user/start-event-planner.sh
chown ec2-user:ec2-user /home/ec2-user/start-event-planner.sh

# Pull images and start containers
echo "Pulling Docker images and starting containers..."
cd /home/ec2-user/event-planner-deploy
docker-compose -f docker-compose.prod.yaml pull
docker-compose -f docker-compose.prod.yaml up -d

# Wait for containers to be healthy
echo "Waiting for containers to start..."
sleep 10

# Check container status
echo "Container status:"
docker ps

echo "EC2 initialization complete!"
echo "Application should be accessible on:"
echo "  Frontend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
echo "  Backend:  http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):4000"
