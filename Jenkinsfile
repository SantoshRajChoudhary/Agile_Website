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
                bat 'docker build -t agile-website .'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat '''
                docker stop agile-container
                docker rm agile-container
                docker run -d -p 80:3000 --name agile-container agile-website
                '''
            }
        }

    }
}
