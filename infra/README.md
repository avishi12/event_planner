# 🚀 AWS Deployment Guide - Event Planner

This guide will help you deploy the Event Planner application to AWS using Terraform.

## 📋 Prerequisites

Before you begin, ensure you have:

1. **AWS Account** - [Sign up](https://aws.amazon.com/free/) for free tier
2. **AWS CLI** - Installed and configured
3. **Terraform** - Installed on your machine
4. **DockerHub Account** - Images must be pushed to DockerHub
5. **SSH Key Pair** - Created in AWS EC2

---

## 🛠️ Step-by-Step Deployment

### Step 1: Install AWS CLI (If not installed)

**Windows (PowerShell):**
```powershell
# Download and run AWS CLI installer
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
```

**WSL/Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

Verify installation:
```bash
aws --version
```

### Step 2: Configure AWS CLI

```bash
aws configure
```

Enter the following when prompted:
- **AWS Access Key ID**: Get from AWS Console → IAM → Users → Security credentials
- **AWS Secret Access Key**: Get from AWS Console
- **Default region name**: `us-east-1` (or your preferred region)
- **Default output format**: `json`

Verify configuration:
```bash
aws sts get-caller-identity
```

### Step 3: Create SSH Key Pair in AWS

1. Go to **AWS Console** → **EC2** → **Key Pairs**
2. Click **Create key pair**
   - Name: `event-planner-key`
   - Type: RSA
   - Format: `.pem`
3. Click **Create** and save the `.pem` file
4. Move the key to a safe location:

**WSL/Linux:**
```bash
mkdir -p ~/.ssh
mv ~/Downloads/event-planner-key.pem ~/.ssh/
chmod 400 ~/.ssh/event-planner-key.pem
```

**Windows:**
```powershell
# Save to a secure location like C:\Users\YourName\.ssh\
```

### Step 4: Push Docker Images to DockerHub

Before deploying, ensure your images are on DockerHub:

```bash
# Navigate to project root
cd event_planner

# Build and push images (if not already done by Jenkins)
docker compose build
docker tag event_planner-frontend eg244991/event-planner-frontend:latest
docker tag event_planner-backend eg244991/event-planner-backend:latest

docker login
docker push eg244991/event-planner-frontend:latest
docker push eg244991/event-planner-backend:latest
```

### Step 5: Configure Terraform

```bash
cd infra

# Copy example config
cp terraform.tfvars.example terraform.tfvars

# Edit with your values
nano terraform.tfvars
```

Update `terraform.tfvars`:
```hcl
aws_region   = "us-east-1"
instance_type = "t2.micro"
key_name     = "event-planner-key"  # Your SSH key name (without .pem)
dockerhub_backend_image  = "eg244991/event-planner-backend:latest"
dockerhub_frontend_image = "eg244991/event-planner-frontend:latest"
```

### Step 6: Deploy Infrastructure with Terraform

```bash
# Initialize Terraform
terraform init

# Preview what will be created
terraform plan

# Create infrastructure
terraform apply
```

Type `yes` when prompted.

**Wait 3-5 minutes** for the EC2 instance to:
- Launch
- Install Docker and Docker Compose
- Pull Docker images
- Start containers

### Step 7: Get Outputs

After deployment, Terraform will display:

```
Outputs:

instance_id = "i-0123456789abcdef0"
instance_public_ip = "54.123.45.67"
frontend_url = "http://54.123.45.67:3000"
backend_url = "http://54.123.45.67:4000"
ssh_command = "ssh -i event-planner-key.pem ec2-user@54.123.45.67"
```

### Step 8: Verify Deployment

**Check if containers are running:**
```bash
# SSH into the instance
ssh -i ~/.ssh/event-planner-key.pem ec2-user@YOUR_PUBLIC_IP

# Check Docker containers
docker ps

# Check logs
docker logs frontend_c
docker logs backend_c
docker logs mongo_c

# Exit
exit
```

**Access the application:**
- Frontend: `http://YOUR_PUBLIC_IP:3000`
- Backend API: `http://YOUR_PUBLIC_IP:4000`

---

## 🔄 Update Deployment

When you push new code and Jenkins builds new images:

### Option 1: SSH and Pull (Manual)
```bash
# SSH to instance
ssh -i ~/.ssh/event-planner-key.pem ec2-user@YOUR_PUBLIC_IP

# Navigate to deployment directory
cd /home/ec2-user/event-planner-deploy

# Pull latest images
docker-compose -f docker-compose.prod.yaml pull

# Recreate containers with new images
docker-compose -f docker-compose.prod.yaml up -d --force-recreate

# Exit
exit
```

### Option 2: Use Startup Script
```bash
ssh -i ~/.ssh/event-planner-key.pem ec2-user@YOUR_PUBLIC_IP
sudo /home/ec2-user/start-event-planner.sh
exit
```

---

## 🐛 Troubleshooting

### Can't SSH to Instance
```bash
# Check security group allows SSH (port 22)
aws ec2 describe-security-groups --group-ids YOUR_SG_ID

# Ensure key has correct permissions
chmod 400 ~/.ssh/event-planner-key.pem
```

### Application Not Accessible
```bash
# SSH to instance
ssh -i ~/.ssh/event-planner-key.pem ec2-user@YOUR_PUBLIC_IP

# Check if containers are running
docker ps

# If not running, check logs
docker logs frontend_c
docker logs backend_c

# Check user-data script execution
sudo cat /var/log/user-data.log

# Restart containers
cd /home/ec2-user/event-planner-deploy
docker-compose -f docker-compose.prod.yaml restart
```

### Containers Keep Restarting
```bash
# Check logs for errors
docker logs backend_c
docker logs mongo_c

# Common issues:
# 1. MongoDB not ready - wait a few more seconds
# 2. Environment variables not set - check docker-compose.prod.yaml
```

### Can't Access on Browser
1. Check Security Group allows ports 3000 and 4000
2. Verify public IP is correct: `aws ec2 describe-instances`
3. Try accessing: `curl http://YOUR_IP:3000`

---

## 💰 Cost Management

### AWS Free Tier (First 12 Months)
- **EC2 t2.micro**: 750 hours/month FREE
- **Storage**: 30GB FREE
- **Data Transfer**: 15GB outbound FREE

### After Free Tier
- **EC2 t2.micro**: ~$8-10/month
- **Storage**: ~$1/month
- **Data Transfer**: Pay as you go

### Cost-Saving Tips
1. **Stop instance when not in use:**
   ```bash
   aws ec2 stop-instances --instance-ids YOUR_INSTANCE_ID
   ```

2. **Start instance when needed:**
   ```bash
   aws ec2 start-instances --instance-ids YOUR_INSTANCE_ID
   ```

3. **Destroy resources completely:**
   ```bash
   cd infra
   terraform destroy
   ```
   Type `yes` to confirm.

---

## 📊 Monitoring

### Check Instance Status
```bash
aws ec2 describe-instances --instance-ids YOUR_INSTANCE_ID
```

### View Terraform State
```bash
cd infra
terraform show
```

### Get Current Outputs
```bash
cd infra
terraform output
```

---

## 🔐 Security Best Practices

1. **Change JWT Secret**
   ```bash
   ssh -i ~/.ssh/event-planner-key.pem ec2-user@YOUR_PUBLIC_IP
   cd /home/ec2-user/event-planner-deploy
   nano docker-compose.prod.yaml
   # Change JWT_SECRET to a strong random value
   docker-compose -f docker-compose.prod.yaml up -d --force-recreate
   ```

2. **Restrict SSH Access**
   - Edit security group to allow SSH only from your IP
   - AWS Console → EC2 → Security Groups → Edit inbound rules
   - Change SSH source from `0.0.0.0/0` to `Your_IP/32`

3. **Use HTTPS (Production)**
   - Set up a domain name
   - Use AWS Certificate Manager
   - Configure Application Load Balancer
   - Enable HTTPS on ports 443

---

## 📝 Files Created

```
infra/
├── main.tf                    # AWS resources definition
├── variables.tf               # Input variables
├── outputs.tf                 # Output values
├── user_data.sh              # EC2 initialization script
├── terraform.tfvars.example  # Example configuration
└── README.md                 # This file
```

---

## 🎯 Quick Commands Reference

```bash
# Initialize Terraform
terraform init

# Preview changes
terraform plan

# Deploy infrastructure
terraform apply

# Show outputs
terraform output

# Destroy infrastructure
terraform destroy

# SSH to instance
ssh -i ~/.ssh/event-planner-key.pem ec2-user@YOUR_PUBLIC_IP

# Update application
ssh -i ~/.ssh/event-planner-key.pem ec2-user@YOUR_PUBLIC_IP
cd /home/ec2-user/event-planner-deploy
docker-compose -f docker-compose.prod.yaml pull
docker-compose -f docker-compose.prod.yaml up -d --force-recreate
```

---

## ✅ Deployment Checklist

- [ ] AWS CLI installed and configured
- [ ] SSH key pair created in AWS
- [ ] Docker images pushed to DockerHub
- [ ] terraform.tfvars configured
- [ ] terraform init completed
- [ ] terraform apply successful
- [ ] Can SSH to instance
- [ ] Containers running (docker ps)
- [ ] Frontend accessible on port 3000
- [ ] Backend accessible on port 4000
- [ ] Application functions correctly

---

## 🆘 Getting Help

If you encounter issues:

1. **Check logs:**
   ```bash
   # On EC2
   sudo cat /var/log/user-data.log
   docker logs frontend_c
   docker logs backend_c
   ```

2. **Verify Security Groups:**
   - Ports 22, 3000, 4000 should be open

3. **Check AWS Status:**
   ```bash
   aws ec2 describe-instance-status --instance-ids YOUR_INSTANCE_ID
   ```

---

**Good luck with your deployment! 🚀**

For more information, see the main [PROJECT-DOCUMENTATION.md](../PROJECT-DOCUMENTATION.md)
