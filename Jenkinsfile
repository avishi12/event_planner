pipeline {
  agent any

  triggers {
    pollSCM('H/2 * * * *')  // Poll GitHub every 2 minutes
  }

  environment {
    DOCKERHUB_REPO_BACKEND  = "eg244991/event-planner-backend"
    DOCKERHUB_REPO_FRONTEND = "eg244991/event-planner-frontend"
    AWS_EC2_IP = "13.60.53.191"  // TODO: Update with your EC2 IP
    AWS_EC2_USER = "ec2-user"
  }

  stages {
    stage('Preflight: Docker access') {
      steps {
        sh '''
          echo "Checking Docker access..."
          whoami
          id
          docker version
          docker info | head -n 30
        '''
      }
    }

    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/avishi12/event_planner.git'
      }
    }

    stage('Compute Image Tag') {
      steps {
        script {
          env.IMAGE_TAG = sh(script: 'git rev-parse --short=12 HEAD', returnStdout: true).trim()
          echo "Using IMAGE_TAG=${env.IMAGE_TAG}"
        }
      }
    }

    stage('Build Backend Image') {
      steps {
        script {
          def backendImage = docker.build("${DOCKERHUB_REPO_BACKEND}:${env.IMAGE_TAG}", "./backend")
          backendImage.tag('latest')
        }
      }
    }

    stage('Build Frontend Image') {
      steps {
        script {
          def frontendImage = docker.build("${DOCKERHUB_REPO_FRONTEND}:${env.IMAGE_TAG}", "./my-react-app")
          frontendImage.tag('latest')
        }
      }
    }

    stage('Push Images') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials',
                                          usernameVariable: 'DOCKER_USERNAME',
                                          passwordVariable: 'DOCKER_PASSWORD')]) {
          sh '''
            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
            docker push ${DOCKERHUB_REPO_BACKEND}:${IMAGE_TAG}
            docker push ${DOCKERHUB_REPO_FRONTEND}:${IMAGE_TAG}
            docker push ${DOCKERHUB_REPO_BACKEND}:latest
            docker push ${DOCKERHUB_REPO_FRONTEND}:latest
          '''
        }
      }
    }

    stage('Deploy Locally (Optional)') {
      when { branch 'main' }
      steps {
        sh '''
          echo "Optional local deploy (only works if Jenkins machine should host it)..."
          docker compose -f docker-compose.yaml up -d || true
        '''
      }
    }

    stage('Deploy to AWS') {
      when { branch 'main' }
      steps {
        script {
          echo "Deploying to AWS EC2: ${AWS_EC2_IP}"
          
          sshagent(['aws-ec2-ssh-key']) {
            sh '''
              ssh -o StrictHostKeyChecking=no ${AWS_EC2_USER}@${AWS_EC2_IP} << 'EOF'
                echo "Connected to AWS EC2 instance"
                
                # Navigate to deployment directory
                cd /home/ec2-user/event-planner-deploy
                
                # Pull latest images from DockerHub
                echo "Pulling latest Docker images..."
                docker-compose -f docker-compose.prod.yaml pull
                
                # Recreate containers with new images
                echo "Restarting containers with new images..."
                docker-compose -f docker-compose.prod.yaml up -d --force-recreate
                
                # Check container status
                echo "Container status:"
                docker ps
                
                echo "Deployment to AWS completed successfully!"
EOF
            '''
          }
        }
      }
    }
  }

  post {
    success { 
      echo "Pipeline succeeded!" 
      echo "Frontend URL: http://${AWS_EC2_IP}:3000"
      echo "Backend URL: http://${AWS_EC2_IP}:4000"
    }
    failure { echo "Pipeline failed!" }
  }
}