# Event Planner - DevOps CI/CD Project

A full-stack event planning web application with complete DevOps pipeline implementation.

## 🎯 Project Overview

**Event Planner** is a modern web application that allows users to browse and book various types of events including weddings, birthdays, corporate events, engagements, anniversaries, and private parties. The project demonstrates industry-standard DevOps practices with Docker containerization and Jenkins CI/CD automation.

## 🏗️ Architecture (Simplified)

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   GitHub    │────▶│   Jenkins    │────▶│  DockerHub  │
│  (Source)   │     │   (CI/CD)    │     │ (Registry)  │
└─────────────┘     └──────────────┘     └─────────────┘
                           │                     │
                           ▼                     ▼
                    ┌──────────────┐     ┌─────────────┐
                    │    Local     │     │   AWS EC2   │
                    │ Development  │     │ (Production)│
                    └──────────────┘     └─────────────┘

User → Frontend (React - Port 3000) → Backend (Express - Port 4000) → MongoDB
```

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI framework
- **React Router DOM 6.8.0** - Routing
- **Axios 1.6.0** - HTTP client
- **CSS3** - Custom styling

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18.2** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.18.1** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs 3.0.2** - Password hashing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Jenkins** - CI/CD automation
- **Git/GitHub** - Version control
- **DockerHub** - Container registry
- **Terraform** - Infrastructure as Code (optional)
- **AWS EC2** - Cloud hosting (optional)

## 📁 Project Structure

```
event_planner/
├── backend/                     # Node.js Express backend
│   ├── models/
│   │   └── User.js             # User schema
│   ├── routes/
│   │   └── auth.js             # Authentication routes
│   ├── server.js               # Server entry point
│   ├── package.json            # Dependencies
│   └── Dockerfile              # Backend container config
│
├── my-react-app/               # React frontend
│   ├── src/
│   │   ├── components/         # Navbar, Footer
│   │   ├── pages/              # Home, Events, Login, Signup, etc.
│   │   ├── App.js              # Main app component
│   │   └── index.js            # Entry point
│   ├── public/
│   ├── package.json            # Dependencies
│   └── Dockerfile              # Frontend container config
│
├── docker-compose.yaml         # Local development
├── docker-compose.prod.yaml    # Production deployment
├── Jenkinsfile                 # CI/CD pipeline
├── PROJECT-DOCUMENTATION.md    # Detailed documentation
├── QUICK-START-GUIDE.md        # Setup guide
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Docker Desktop
- WSL2 (Windows) or Linux
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/avishi12/event_planner.git
   cd event_planner
   ```

2. **Start the application**
   ```bash
   docker compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

4. **Stop the application**
   ```bash
   docker compose down
   ```

## 🐳 Docker Services

The application runs 3 services:

1. **Frontend** (Port 3000)
   - React application
   - Serves the UI

2. **Backend** (Port 4000)
   - Express API server
   - Handles authentication
   - MongoDB connection

3. **MongoDB** (Port 27017)
   - Database service
   - Persistent data storage

## 🔧 Configuration

### Environment Variables

**Backend** (`docker-compose.yaml`):
```yaml
MONGO_URI=mongodb://mongo:27017/devops
JWT_SECRET=your_jwt_secret
```

**Frontend** (`docker-compose.yaml`):
```yaml
REACT_APP_API_URL=http://localhost:4000
```

## 📚 Features

### Implemented
- ✅ User Authentication (Signup/Login)
- ✅ Event Catalog Display
- ✅ Responsive Design
- ✅ Navigation (Home, Events, About Us, Contact)

### Frontend Only (Not Connected to Backend)
- 📋 Event Booking Form (UI mockup)
- 📋 Event Details Display

### To Be Implemented
- ⏳ Event Booking API
- ⏳ Event Management Dashboard
- ⏳ User Profile
- ⏳ Booking History

## 🔄 CI/CD Pipeline

### Jenkins Pipeline Stages:

1. **Preflight Check** - Verify Docker access
2. **Checkout** - Pull code from GitHub
3. **Compute Image Tag** - Generate tag from Git commit
4. **Build Backend Image** - Build and tag backend
5. **Build Frontend Image** - Build and tag frontend
6. **Push Images** - Push to DockerHub
7. **Deploy Locally** - Optional local deployment

### Trigger Pipeline:
1. Push code to GitHub
2. Jenkins automatically builds and deploys
3. Images available on DockerHub

## 📖 Documentation

- **[PROJECT-DOCUMENTATION.md](PROJECT-DOCUMENTATION.md)** - Complete technical documentation
- **[QUICK-START-GUIDE.md](QUICK-START-GUIDE.md)** - Step-by-step setup guide

## 🧪 Testing

### Test Backend API
```bash
# Check server is running
curl http://localhost:4000

# Test signup
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🐛 Troubleshooting

### Containers won't start
```bash
docker compose down
docker compose up --build
```

### Check logs
```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo
```

### Reset everything
```bash
docker compose down -v
docker system prune -a
docker compose up --build
```

## 🌐 Deployment

### DockerHub Images
- Frontend: `eg244991/event-planner-frontend`
- Backend: `eg244991/event-planner-backend`

### AWS Deployment (Optional)
See [QUICK-START-GUIDE.md](QUICK-START-GUIDE.md) for AWS deployment with Terraform.

## 👥 Contributors

- **Avishi** - [GitHub](https://github.com/avishi12)

## 📝 License

This project is for educational purposes.

## 🙏 Acknowledgments

This project demonstrates DevOps best practices including:
- Containerization with Docker
- CI/CD automation with Jenkins
- Infrastructure as Code with Terraform
- Cloud deployment on AWS
- Version control with Git/GitHub

---

**Happy Event Planning! 🎉**
