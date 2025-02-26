pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'git@github.com:LucasMuraro/agro_sobjak.git', branch: 'main'
            }
        }
        
        stage('Build') {
            steps {
                sh './gradlew build' // Para o backend Java com Gradle
                sh 'npm install --prefix my-react-app' // Para o frontend React
                sh 'npm run build --prefix my-react-app' // Build do frontend
            }
        }

        stage('Test') {
            steps {
                sh './gradlew test' // Testes no backend
                sh 'npm test --prefix my-react-app' // Testes no frontend
            }
        }

        stage('Docker Build & Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose build'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo 'Pipeline executado com sucesso!'
        }
        failure {
            echo 'Pipeline falhou!'
        }
    }
}
