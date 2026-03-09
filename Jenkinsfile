pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/SantoshRajChoudhary/Agile_Website.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t agile-website .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                docker stop agile-container || true
                docker rm agile-container || true
                docker run -d -p 80:3000 --name agile-container agile-website
                '''
            }
        }

    }
}
