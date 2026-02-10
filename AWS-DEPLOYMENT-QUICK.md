# 🚀 AWS Deployment - Quick Reference

## Prerequisites Checklist

- [ ] AWS Account created
- [ ] AWS CLI installed and configured
- [ ] Terraform installed
- [ ] Docker images pushed to DockerHub
- [ ] SSH key pair created in AWS EC2

---

## Quick Deployment Steps

### 1. Configure AWS CLI
```bash
aws configure
# Enter: Access Key ID, Secret Access Key, Region (us-east-1), Format (json)
```

### 2. Create SSH Key in AWS Console
- Go to EC2 → Key Pairs → Create Key Pair
- Name: `event-planner-key`
- Save the `.pem` file securely

### 3. Configure Terraform
```bash
cd infra
cp terraform.tfvars.example terraform.tfvars
nano terraform.tfvars  # Update with your key_name
```

### 4. Deploy
```bash
terraform init
terraform plan
terraform apply  # Type "yes"
```

### 5. Wait 3-5 Minutes
The EC2 instance will:
- Install Docker
- Pull images from DockerHub
- Start containers automatically

### 6. Get Your URLs
```bash
terraform output
# Copy the frontend_url and backend_url
```

### 7. Access Application
```
Frontend: http://YOUR_IP:3000
Backend:  http://YOUR_IP:4000
```

---

## Update Deployed Application

```bash
# SSH to instance
ssh -i ~/.ssh/event-planner-key.pem ec2-user@YOUR_IP

# Pull and restart
cd /home/ec2-user/event-planner-deploy
docker-compose -f docker-compose.prod.yaml pull
docker-compose -f docker-compose.prod.yaml up -d --force-recreate
exit
```

---

## Troubleshooting

### Can't access application?
```bash
# Check security group (ports 22, 3000, 4000 should be open)
# Check containers are running
ssh -i ~/.ssh/event-planner-key.pem ec2-user@YOUR_IP
docker ps
```

### Need to restart?
```bash
ssh -i ~/.ssh/event-planner-key.pem ec2-user@YOUR_IP
cd /home/ec2-user/event-planner-deploy
docker-compose -f docker-compose.prod.yaml restart
```

---

## Stop/Start Instance (Save Costs)

### Stop Instance
```bash
aws ec2 stop-instances --instance-ids YOUR_INSTANCE_ID
```

### Start Instance
```bash
aws ec2 start-instances --instance-ids YOUR_INSTANCE_ID
# Get new IP: aws ec2 describe-instances --instance-ids YOUR_INSTANCE_ID
```

---

## Destroy Everything

```bash
cd infra
terraform destroy  # Type "yes"
```

**WARNING:** This deletes everything including data!

---

## Costs (After Free Tier)

- EC2 t2.micro: ~$8-10/month
- Stop when not in use to save money

---

## Important Commands

```bash
# SSH to instance
ssh -i ~/.ssh/event-planner-key.pem ec2-user@YOUR_IP

# View logs
docker logs frontend_c
docker logs backend_c

# Restart containers
docker-compose -f docker-compose.prod.yaml restart

# Check Terraform outputs
terraform output
```

---

For detailed instructions, see [infra/README.md](infra/README.md)
