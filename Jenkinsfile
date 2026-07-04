pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20', daysToKeepStr: '30'))
    }

    environment {
        BASE_URL = 'http://jupiter.cloud.planittesting.com'
        CI       = 'true'
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Playwright Version') {
            steps {
                sh 'npx playwright --version'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'rm -rf playwright-report test-results'
                sh '''
                    unset GITHUB_SHA CI_COMMIT_SHA GIT_COMMIT
                    npx playwright test'
                '''
                
            }
        }
    }

    post {
        always {
            publishHTML([
                allowMissing         : true,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                reportName           : 'Playwright Test Report'
            ])
        }
        failure {
            archiveArtifacts(
                artifacts        : 'playwright-report/**,test-results/**',
                allowEmptyArchive: true
            )
        }
        cleanup {
            cleanWs()
        }
    }
}
