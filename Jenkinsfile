pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/SantoshRajChoudhary/Agile_Website.git'
            }
        }

        stage('Build & Run Containers') {
            steps {
                bat 'docker compose up -d --build'
            }
        }

    }
}
