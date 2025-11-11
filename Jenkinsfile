pipeline {
  agent any

  environment {
    // adjust these if your Jenkins agents use different tool names
    NODE_HOME = tool name: 'NodeJS 18', type: 'nodejs'
    PATH = "${env.NODE_HOME}/bin:${env.PATH}"
  }

  stages {
    stage('Prepare') {
      steps {
        echo 'Checking out source'
        checkout scm
      }
    }

    stage('Install backend dependencies') {
      steps {
        dir('backend') {
          sh 'npm ci'
        }
      }
    }

    stage('Run backend tests') {
      steps {
        dir('backend') {
          // add your test command here if present
          sh 'npm test || true'
        }
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'backend/test-results/**/*.xml'
        }
      }
    }

    stage('Install frontend dependencies & build') {
      steps {
        dir('my-react-app') {
          sh 'npm ci'
          sh 'npm run build'
        }
      }
      post {
        success {
          archiveArtifacts artifacts: 'my-react-app/build/**', fingerprint: true
        }
      }
    }

    stage('Build Docker images') {
      steps {
        // Use docker-compose to build images; ensure agent has docker and docker-compose installed
        sh 'docker compose -f ${WORKSPACE}/docker-compose.yaml build --pull --no-cache'
      }
    }

    stage('Deploy (optional)') {
      when {
        branch 'main'
      }
      steps {
        sh 'docker compose -f ${WORKSPACE}/docker-compose.yaml up -d'
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished'
      sh 'docker images || true'
    }
    failure {
      mail to: 'dev-team@example.com', subject: "Jenkins: Build failed - ${env.JOB_NAME} #${env.BUILD_NUMBER}", body: "Check console output: ${env.BUILD_URL}"
    }
  }
}
