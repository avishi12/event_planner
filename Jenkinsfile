pipeline {
    agent any

    environment {
        DOCKERHUB_REPO_BACKEND = 'eg244991/event-planner-backend'
        DOCKERHUB_REPO_FRONTEND = 'eg244991/event-planner-frontend'
    }

    stages {
        stage('Preflight: Docker access') {
            steps {
                sh '''
                    echo "Checking Docker access..."
                    whoami
                    id
                    docker version || true
                    docker info | head -n 20 || true
                '''
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/avishi12/event_planner.git'
            }
        }


        stage('Build Backend') {
            steps {
                script {
                    docker.build("${DOCKERHUB_REPO_BACKEND}:latest", "./backend")
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    docker.build("${DOCKERHUB_REPO_FRONTEND}:latest", "./my-react-app")
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                            echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                            docker push ${DOCKERHUB_REPO_BACKEND}:latest
                            docker push ${DOCKERHUB_REPO_FRONTEND}:latest
                        '''
                    }
                }
            }
        }

        stage('Deploy Locally (Optional)') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    echo "Starting services with docker-compose..."
                    docker compose -f docker-compose.yaml up -d || echo "Compose up failed (optional)."
                '''
            }
        }
    }

    post {
        success { echo 'Pipeline succeeded!' }
        failure { echo 'Pipeline failed!' }
    }
}
