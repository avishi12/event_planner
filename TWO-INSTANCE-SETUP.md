# 🚀 Two Instance Setup Guide

This setup creates **2 separate EC2 instances** for optimal performance:

## 📋 Architecture

```
┌─────────────────────┐         ┌─────────────────────┐
│  Jenkins Server     │         │   App Server        │
│  (t3.micro)         │ SSH─────▶  (t3.micro)         │
│                     │ Deploy  │                     │
│  - Jenkins (8080)   │         │  - Frontend (3000)  │
│  - Docker           │         │  - Backend (4000)   │
│  - Git              │         │  - Docker           │
│                     │         │                     │
│  ~800MB free RAM    │         │  ~600MB free RAM    │
└─────────────────────┘         └─────────────────────┘
```

## ✅ Benefits

- **Jenkins has full memory** (~800MB) - no more freezing!
- **App runs smoothly** (~600MB) without Jenkins competing
- **Clean separation** - easier to manage and troubleshoot
- **Still FREE** for 3 days (144 hours total / 750 free hours)

---

## 🚀 Deployment Steps

### Step 1: Destroy Old Instance (if exists)

```bash
cd ~/event_planner/infra
terraform destroy
# Type: yes
```

### Step 2: Deploy Both Instances

```bash
# Make sure you're in infra folder
cd ~/event_planner/infra

# Initialize (if needed)
terraform init

# Deploy
terraform apply
```

Type `yes` when prompted.

**Wait 5-7 minutes** for both instances to initialize.

### Step 3: Get Outputs

```bash
terraform output
```

You'll see:
```
App Server:
  IP: 51.x.x.x
  Frontend: http://51.x.x.x:3000
  Backend:  http://51.x.x.x:4000

Jenkins Server:
  IP: 52.x.x.x
  Jenkins: http://52.x.x.x:8080
```

**Save both IPs!**

---

## 🔧 Jenkins Setup

### Step 1: Get Jenkins Password

```bash
# SSH to Jenkins server
ssh -i ~/.ssh/event-planner.pem ec2-user@JENKINS_IP

# Get password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# Copy the password and exit
exit
```

### Step 2: Open Jenkins

Open browser: `http://JENKINS_IP:8080`

1. **Paste password** → Continue
2. **Select plugins to install** → Click **"None"** → Install (skip all plugins!)
3. **Create admin user**:
   - Username: `admin`
   - Password: (your choice)
   - Email: your@email.com
4. **Jenkins URL**: Keep as is → Save
5. **Start using Jenkins**

### Step 3: Install Docker Pipeline Plugin

1. **Manage Jenkins** → **Plugins** → **Available plugins**
2. Search: `Docker Pipeline`
3. Check **only** that one → **Install without restart**
4. Wait for installation to complete

### Step 4: Add Credentials

**DockerHub:**
1. **Manage Jenkins** → **Credentials** → **Global** → **Add**
2. Kind: Username with password
3. Username: `eg244991`
4. Password: (your DockerHub password)
5. ID: `dockerhub-credentials`
6. Create

**App Server SSH Key:**
1. **Manage Jenkins** → **Credentials** → **Global** → **Add**
2. Kind: **SSH Username with private key**
3. ID: `app-server-ssh-key`
4. Username: `ec2-user`
5. Private Key: **Enter directly** → Paste your event-planner.pem content
6. Create

### Step 5: Update Jenkinsfile

Edit `Jenkinsfile.aws` line 10:
```groovy
APP_SERVER_IP = 'YOUR_APP_IP_HERE'  // Replace with actual App Server IP
```

Commit and push:
```bash
cd ~/event_planner
git add Jenkinsfile.aws
git commit -m "Update app server IP"
git push
```

### Step 6: Create Pipeline Job

1. **New Item** → Name: `event-planner-deploy` → **Pipeline** → OK
2. **Build Triggers**: ✅ Poll SCM: `H/2 * * * *`
3. **Pipeline**:
   - Definition: Pipeline script from SCM
   - SCM: Git
   - Repository: `https://github.com/avishi12/event_planner.git`
   - Branch: `*/main`
   - Script Path: `Jenkinsfile.aws`
4. **Save**

### Step 7: Build!

1. Click **Build Now**
2. Watch the magic happen! 🎉

---

## 🎯 Testing

### Test App Server:
- Frontend: `http://APP_IP:3000`
- Backend: `http://APP_IP:4000`

### Test Auto-Deploy:
```bash
cd ~/event_planner
echo "// test" >> README.md
git add .
git commit -m "Test auto-deploy"
git push
```

Within 2 minutes, Jenkins will detect and deploy!

---

## 💰 3-Day Cost Breakdown

| Resource | Hours | Cost |
|----------|-------|------|
| App Server (t3.micro) | 72 | FREE ✅ |
| Jenkins Server (t3.micro) | 72 | FREE ✅ |
| **Total** | **144/750** | **$0.00** 🎉 |

You're using **19% of free tier** - plenty of room!

---

## 📊 Memory Comparison

| Setup | App Memory | Jenkins Memory | Issues |
|-------|------------|----------------|--------|
| **Old (1 instance)** | 53 Mi free | Sharing | Jenkins freezes ❌ |
| **New (2 instances)** | ~600 Mi free | ~800 Mi free | Smooth! ✅ |

---

## 🛠️ Troubleshooting

### Jenkins won't load?
```bash
ssh -i ~/.ssh/event-planner.pem ec2-user@JENKINS_IP
sudo systemctl restart jenkins
free -h  # Check memory
```

### Can't deploy to app server?
- Check SSH key in Jenkins credentials
- Verify APP_SERVER_IP in Jenkinsfile
- Test SSH manually: `ssh -i ~/.ssh/event-planner.pem ec2-user@APP_IP`

### After 3 days, want to continue?
Stop Jenkins when not using:
```bash
aws ec2 stop-instances --instance-ids JENKINS_INSTANCE_ID --region eu-north-1
```

Keep app running 24/7 = still FREE (744 hours < 750)!

---

## ✅ Quick Checklist

- [ ] `terraform destroy` old instance
- [ ] `terraform apply` new setup
- [ ] Get both IPs from `terraform output`
- [ ] SSH to Jenkins, get password
- [ ] Open Jenkins web, skip plugins
- [ ] Install Docker Pipeline plugin only
- [ ] Add DockerHub credentials
- [ ] Add App Server SSH key
- [ ] Update Jenkinsfile with APP_SERVER_IP
- [ ] Create pipeline job
- [ ] Build and test!

---

**Enjoy your smooth, performant CI/CD setup!** 🚀
