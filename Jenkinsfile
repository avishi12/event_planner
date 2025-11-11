pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKERHUB_REPO_BACKEND = 'avishi12/event-planner-backend'
        DOCKERHUB_REPO_FRONTEND = 'avishi12/event-planner-frontend'
    }

    stages {
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
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                        docker.image("${DOCKERHUB_REPO_BACKEND}:latest").push()
                        docker.image("${DOCKERHUB_REPO_FRONTEND}:latest").push()
                    }
                }
            }
        }

        stage('Deploy Locally (Optional)') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh '''
                        echo "Starting services with docker-compose..."
                        docker compose -f docker-compose.yaml up -d
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
