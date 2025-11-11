Jenkins pipeline for event_planner

## Current Pipeline Approach (Docker Pipeline Plugin)

This Jenkinsfile uses the **Docker Pipeline Plugin** which is more reliable than shell-based commands.

### Requirements for Jenkins agents:
- **Docker Pipeline Plugin** installed in Jenkins
- Docker available on the Jenkins agent (Docker-in-Docker setup recommended)
- **Jenkins Credentials**:
  - Add Docker Hub credentials as 'dockerhub-credentials' (username/password type)
  - Update `DOCKERHUB_REPO_BACKEND` and `DOCKERHUB_REPO_FRONTEND` in the Jenkinsfile to match your Docker Hub repositories

### How it works:
1. Checkout repo from GitHub
2. Build backend Docker image using `./backend` context
3. Build frontend Docker image using `./my-react-app` context
4. Push both images to Docker Hub
5. Optionally deploy locally using docker-compose (only on main branch)

### Setup Instructions:

1. **Install Docker Pipeline Plugin** in Jenkins
2. **Configure Docker Hub Credentials**:
   - Go to Jenkins → Credentials → System → Global credentials
   - Add new credentials: Username/Password type
   - ID: `dockerhub-credentials`
   - Username: your Docker Hub username
   - Password: your Docker Hub password or access token

3. **Create Docker Hub Repositories**:
   - `avishi12/event-planner-backend`
   - `avishi12/event-planner-frontend`
   - (Update the repo names in Jenkinsfile if different)

4. **Ensure Docker Access**:
   - Jenkins agent must have access to Docker daemon
   - For Docker-in-Docker: mount `/var/run/docker.sock` or use dind

### Alternative Files:
- `Jenkinsfile.docker` - Uses Docker agents for Node.js operations (if you prefer npm-based builds)
- Original `Jenkinsfile` backup available in git history

### Notes:
- This approach builds Docker images directly without running npm commands on the Jenkins agent
- Dependencies are installed inside the Docker build process
- Much more reliable than shell-based npm commands
- Automatic cleanup with `docker system prune`
