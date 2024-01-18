pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'cp home/kienngsi/test_ci_cd_team/index.html /var/www/test_ngsi_website/html/'
                    sh 'sudo systemctl restart nginx'
                }
            }
        }
    }
}