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
                branch 'dev'
            }
            steps {
                script {
                    echo "Running CI on branch ${env.BRANCH_NAME}"
                    dir('reactjs_project') {
                        sh 'npm install'
                        def result = sh(script: 'npm test', returnStatus: true)
                        if (result != 0) {
                            error 'Test failed'
                        } else {
                            echo "All tests passed successfully."
                        }
                    }
                }
            }
        }

        stage('Deploy to Environment (CD)') {
            when {
                // expression {env.BRANCH_NAME == 'main'}
                branch 'main'
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