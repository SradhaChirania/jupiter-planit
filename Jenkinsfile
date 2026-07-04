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

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run Tests') {
            environment {
                // Prevent Playwright HTML reporter from scraping commit info
                CI_COMMIT_SHA = ''
                GITHUB_SHA    = ''
            }
            steps {
                sh 'npx playwright test'
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
