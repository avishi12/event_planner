Jenkins pipeline for event_planner

## Two Pipeline Options

### Option 1: NodeJS Tool (Jenkinsfile)
Requirements for Jenkins agents:
- **NodeJS Tool**: Install Node.js 18+ via Jenkins Global Tool Configuration
  - Go to Jenkins → Manage Jenkins → Global Tool Configuration
  - Add NodeJS installation (name it 'NodeJS' to match the Jenkinsfile)
  - Select "Install automatically" or provide path to existing installation
- Docker and docker-compose available on the agent (for image build and optional deploy)
- Sufficient disk space for Docker images and npm caches

### Option 2: Docker Agents (Jenkinsfile.docker)
Requirements for Jenkins agents:
- Docker available on the Jenkins agent (Docker-in-Docker setup recommended)
- Docker Pipeline plugin installed in Jenkins
- No need to install Node.js separately (uses node:18-alpine containers)

## How it works
1. Checkout repo
2. Install backend dependencies and run tests (uses NodeJS tool or Docker agent)
3. Install frontend dependencies and build (uses NodeJS tool or Docker agent, artifacts archived)
4. Build Docker images using `docker compose build`
5. If the branch is `main`, `docker compose up -d` will run (optional)

## Setup Instructions

### For Option 1 (NodeJS Tool):
1. Install NodeJS tool in Jenkins Global Tool Configuration
2. Ensure Docker is available on Jenkins agents
3. Use `Jenkinsfile`

### For Option 2 (Docker Agents):
1. Set up Docker-in-Docker or ensure Docker socket access
2. Install Docker Pipeline plugin
3. Rename `Jenkinsfile.docker` to `Jenkinsfile` or configure Jenkins to use it

## Notes
- The Jenkinsfile assumes `docker` and `docker compose` are available to the Jenkins agent. For shell agents running inside Docker, use the Docker-in-Docker pattern or a dedicated agent with Docker.
- You may want to add caching (npm cache) or use specific build agents for speed and security.
