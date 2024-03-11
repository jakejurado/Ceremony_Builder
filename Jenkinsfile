pipeline {
    agent { docker { image 'node:18.16.0-alpine' } }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('deploy') {
            steps {
                sh 'npm run build' 
                sh 'railway up' 
            }
        }
    }
}