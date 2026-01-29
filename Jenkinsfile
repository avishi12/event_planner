pipeline {
  agent any

  environment {
    DOCKERHUB_REPO_BACKEND  = "eg244991/event-planner-backend"
    DOCKERHUB_REPO_FRONTEND = "eg244991/event-planner-frontend"
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
  }

  post {
    success { echo "Pipeline succeeded!" }
    failure { echo "Pipeline failed!" }
  }
}