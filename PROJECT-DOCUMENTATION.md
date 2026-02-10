# Event Planner - Complete DevOps Project Documentation

## 📋 Project Overview

This is a full-stack web application with a **complete DevOps CI/CD pipeline** demonstrating:
- Containerization with Docker
- Continuous Integration/Deployment with Jenkins
- Infrastructure as Code with Terraform
- Cloud deployment on AWS EC2
- Container orchestration with Docker Compose

**Application**: Event Planner - A comprehensive event management platform for weddings, birthdays, corporate events, and more

---

## 🏗️ Project Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   GitHub    │────▶│   Jenkins    │────▶│  DockerHub  │
│ (Source)    │     │   (CI/CD)    │     │  (Registry) │
└─────────────┘     └──────────────┘     └─────────────┘
                           │                      │
                           ▼                      ▼
                    ┌──────────────┐      ┌─────────────┐
                    │  Local/Dev   │      │  AWS EC2    │
                    │ Environment  │      │ (Production)│
                    └──────────────┘      └─────────────┘
```

---

## 📁 Project Structure

```
event_planner/
├── backend/                    # Node.js Express backend
│   ├── models/
│   │   └── User.js            # User schema (Mongoose)
│   ├── routes/
│   │   └── auth.js            # Authentication routes
│   ├── server.js              # Server entry point
│   ├── package.json           # Node.js dependencies
│   └── Dockerfile             # Backend container config
│
├── my-react-app/              # React frontend
│   ├── src/
│   │   ├── components/        # Navbar, Footer
│   │   ├── pages/             # Home, Events, Login, Signup, etc.
│   │   ├── App.js             # Main app component
│   │   └── index.js           # Entry point
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── package.json           # Node.js dependencies
│   └── Dockerfile             # Frontend container config
│
├── docker-compose.yaml        # Local development setup
├── docker-compose.prod.yaml   # Production setup
├── Jenkinsfile                # CI/CD pipeline definition
├── PROJECT-DOCUMENTATION.md   # This file
└── QUICK-START-GUIDE.md       # Setup guide
```

---

## 🛠️ Technologies Used

### **Frontend**
- React 18.2.0 - UI framework
- React Router DOM 6.8.0 - Client-side routing
- Axios 1.6.0 - HTTP client
- CSS3 - Custom styling

### **Backend**
- Node.js - JavaScript runtime
- Express 4.18.2 - Web framework
- MongoDB - NoSQL database
- Mongoose 8.18.1 - MongoDB ODM
- JWT - Authentication (jsonwebtoken 9.0.2)
- bcryptjs 3.0.2 - Password hashing

### **DevOps Tools**
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Jenkins** - CI/CD automation
- **Terraform** - Infrastructure as Code (optional)
- **Git/GitHub** - Version control
- **DockerHub** - Container registry
- **AWS EC2** - Cloud hosting (optional)

---

## 🚀 CI/CD Pipeline Flow

### **Jenkins Pipeline Stages:**

1. **Checkout** 
   - Pulls latest code from GitHub repository
   - Branch: `main`

2. **Build Backend**
   - Builds Docker image: `eg244991/event-planner-backend:latest`
   - Includes Node.js dependencies

3. **Build Frontend**
   - Builds Docker image: `eg244991/event-planner-frontend:latest`
   - Builds React production bundle

4. **Push Images**
   - Authenticates with DockerHub
   - Pushes both images to registry

5. **Deploy Locally (Optional)**
   - Deploys to localhost if on main branch
   - Uses docker-compose to start containers

---

## ☁️ AWS Infrastructure (Terraform)

### **Resources Created:**

1. **Security Group** (`aws_security_group.event_planner_sg`)
   - Ports: 22 (SSH), 3000 (Frontend), 4000 (Backend)
   - Allows inbound traffic from anywhere

2. **EC2 Instance** (`aws_instance.event_planner`)
   - Instance type: `t2.micro` (free tier eligible)
   - AMI: Amazon Linux 2023 (auto-fetched)
   - Storage: 10GB gp3 volume
   - User data: Automated setup script

3. **Default VPC** (auto-detected)
   - Uses AWS default VPC for simplicity

### **Terraform Workflow:**

```bash
# Initialize Terraform
terraform init

# Preview infrastructure changes
terraform plan

# Create infrastructure
terraform apply

# Destroy infrastructure (cleanup)
terraform destroy
```

### **EC2 Initialization (user_data.sh):**

When EC2 instance launches, it automatically:
1. Updates system packages
2. Installs Docker & Docker Compose
3. Creates deployment directory
4. Downloads docker-compose.prod.yml
5. Schedules container startup on reboot

---

## 🐳 Docker Configuration

### **Backend Dockerfile:**
- Base: `node:18-alpine`
- Installs dependencies via npm
- Exposes port 4000
- Runs Express server

### **Frontend Dockerfile:**
- Base: `node:18-alpine`
- Builds React production bundle
- Uses serve to host static files
- Exposes port 80 (mapped to 3000 on host)

### **docker-compose.yaml:**
```yaml
services:
  frontend:   # React app (host port 3000)
  backend:    # Express API (host port 4000)
  mongo:      # MongoDB database

volumes:
  mongo-data:  # Persistent MongoDB data
```

---

## 🔄 Deployment Process

### **Development (Local):**
```bash
docker-compose up --build
```
Access: http://localhost:3000

### **Production (AWS):**

**1. Infrastructure Setup (One-time):**
```bash
cd infra
terraform apply
```

**2. Initial Deployment:**
```bash
# Connect to EC2
ssh -i your-key.pem ec2-user@YOUR_EC2_IP

# Start containers
cd /home/ec2-user/event-planner-deploy
docker-compose -f docker-compose.prod.yaml up -d
```

**3. Updates (via Jenkins):**
- Push code to GitHub
- Jenkins automatically builds and pushes images
- Manually pull and restart on AWS

---

## 🔧 Key Technical Configurations

### **1. CORS Configuration (backend/server.js):**
```javascript
const cors = require("cors");
app.use(cors());
```

### **2. API calls (frontend pages):**
```javascript
// Login.js and Signup.js
axios.post("http://localhost:4000/api/auth/login", {...})
axios.post("http://localhost:4000/api/auth/signup", {...})
```

### **3. MongoDB Connection (backend/server.js):**
```javascript
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
```

---

## 📊 Monitoring & Verification

### **Check Docker Containers:**
```bash
docker ps
```
Expected: 3 containers running (mongo, backend, frontend)

### **View Logs:**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### **Test Backend API:**
```bash
curl http://localhost:4000/
# Expected: Server response
```

### **Access Frontend:**
Browse to: http://localhost:3000

---

## 🎯 DevOps Best Practices Demonstrated

1. **Infrastructure as Code** - Terraform manages all AWS resources
2. **Containerization** - Application runs consistently everywhere
3. **CI/CD Automation** - Jenkins automates build and deployment
4. **Version Control** - All code tracked in Git
5. **Container Registry** - Images stored in DockerHub
6. **Environment Separation** - Dev (localhost) vs Prod (AWS)
7. **Configuration Management** - Dynamic configs for different environments
8. **Security** - SSH keys, credential management, security groups
9. **Scalability** - Easy to replicate and scale
10. **Documentation** - Complete project documentation

---

## 🐛 Troubleshooting

### **Issue: Containers not starting**
```bash
# Check logs
docker-compose logs

# Restart containers
docker-compose down
docker-compose up -d
```

### **Issue: Database errors**
```bash
# Check MongoDB connection
docker-compose logs mongo

# Restart MongoDB
docker-compose restart mongo
```

### **Issue: CORS errors**
- Verify backend has CORS enabled
- Check frontend is calling `http://localhost:4000`

### **Issue: Can't connect to AWS**
```bash
# Test connection
ssh -i your-key.pem ec2-user@YOUR_EC2_IP

# Check security group allows ports 3000, 4000
```

---

## 💰 AWS Cost Management

- **EC2 t3.micro**: 750 hours/month free (first 12 months)
- **EBS Storage**: 30GB free tier
- **Data Transfer**: 15GB outbound free

**Always destroy resources when done:**
```bash
terraform destroy
```

---

## 📝 Viva Questions & Answers

### **Q: Why use Docker?**
A: Ensures consistency across development, staging, and production. "Works on my machine" problems are eliminated.

### **Q: Why Jenkins for CI/CD?**
A: Industry-standard automation tool. Automates repetitive tasks, reduces human error, enables rapid deployment.

### **Q: Why Terraform?**
A: Infrastructure as Code allows version-controlled, reproducible infrastructure. Easy to create/destroy environments.

### **Q: Why separate dev and prod deployments?**
A: Safety - prevents accidental production changes. Industry standard practice for controlled production releases.

### **Q: Why DockerHub?**
A: Central registry for Docker images. Enables image versioning and distribution across environments.

### **Q: Why MongoDB?**
A: NoSQL database perfect for flexible schemas. Mongoose provides elegant ODM for Node.js. Easy to scale.

### **Q: Explain the data flow:**
A: User → Frontend (React on port 3000) → Backend API (Express on port 4000) → Database (MongoDB) → Response to Frontend

### **Q: How does the pipeline ensure quality?**
A: Automated builds catch errors early. Consistent Docker images ensure reliability. Manual production deployment adds approval gate.

---

## 🎓 Learning Outcomes

✅ **Containerization** - Docker, Docker Compose  
✅ **CI/CD** - Jenkins pipeline automation  
✅ **Cloud Computing** - AWS EC2 deployment  
✅ **Infrastructure as Code** - Terraform  
✅ **Version Control** - Git, GitHub  
✅ **Full Stack Development** - React + Node.js/Express  
✅ **DevOps Practices** - Automation, monitoring, deployment strategies  
✅ **Networking** - Security groups, ports, CORS  
✅ **Database Management** - MongoDB, Mongoose ODM  
✅ **Container Registry** - DockerHub integration  

---

## 📞 Support

For issues or questions:
1. Check logs: `docker-compose logs`
2. Verify containers: `docker ps`
3. Review Terraform state: `terraform show`
4. Check Jenkins console output

---

## 🏆 Project Success Criteria

✅ Application runs locally via Docker Compose  
✅ Jenkins pipeline builds and pushes images automatically  
✅ Terraform provisions AWS infrastructure  
✅ Application deployed and accessible on AWS  
✅ Complete documentation provided  
✅ Demonstrates end-to-end DevOps workflow  

---

**Project Status**: ✅ Complete and Deployed  
**Repository**: GitHub (avishi12/event_planner)  
**Container Images**: DockerHub (eg244991/event-planner-*)
