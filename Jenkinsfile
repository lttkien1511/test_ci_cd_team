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
        stage('Build and Test (CI)') {
            when {
                expression { env.BRANCH_NAME == 'dev' }
            }
            steps {
                script {
                    echo "Running CI on branch ${env.BRANCH_NAME}"
                    def content = readFile('index.html').trim()
                    if (content.contains('error')) {
                        error "CI Failed: File contains an error"
                    } else {
                        echo "CI Passed: File does not contain errors."
                    }
                }
            }
        }

        stage('Deploy to Environment (CD)') {
            when {
                expression {env.BRANCH_NAME == 'main'}
            }
            steps {
                script {
                    sh 'cp /home/kienngsi/test_ci_cd_team/index.html /var/www/test_ngsi_website/html/'
                    sh 'sudo systemctl restart nginx'
                }
            }
        }
    }
}