pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20', daysToKeepStr: '30'))
    }

    environment {
        BASE_URL                     = 'http://jupiter.cloud.planittesting.com'
        CI                           = 'true'
        PLAYWRIGHT_JUNIT_OUTPUT_NAME = 'test-results/junit-results.xml'
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
            steps {
                sh 'npx playwright test --reporter=html,junit'
            }
        }
    }

    post {
        always {
            junit(
                testResults: 'test-results/junit-results.xml',
                allowEmptyResults: true
            )
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
        }
        failure {
            archiveArtifacts(
                artifacts: 'test-results/**',
                allowEmptyArchive: true
            )
        }
        cleanup {
            cleanWs()
        }
    }
}
