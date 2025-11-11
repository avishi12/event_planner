Jenkins pipeline for event_planner

Requirements for Jenkins agents:
- Node.js 18 (install via Jenkins NodeJS tool or ensure PATH)
- Docker and docker-compose available on the agent (for image build and optional deploy)
- Sufficient disk space for Docker images and npm caches

How it works
1. Checkout repo
2. Install backend dependencies and run tests
3. Install frontend dependencies and build (artifacts archived)
4. Build Docker images using `docker compose build`
5. If the branch is `main`, `docker compose up -d` will run (optional)

Notes
- The Jenkinsfile assumes `docker` and `docker compose` are available to the Jenkins agent. For shell agents running inside Docker, use the Docker-in-Docker pattern or a dedicated agent with Docker.
- Adjust `NODE_HOME` tool name in the Jenkinsfile to match your Jenkins NodeJS tool installation.
- You may want to add caching (npm cache) or use specific build agents for speed and security.
