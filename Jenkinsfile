pipeline {
    agent any
    environment {
        REPO_NAME = 'Playwright_AIOZ'
        FILE_SH = 'AIOZ_Finance.sh'
        FILE_BAT = 'AIOZ_Finance.bat'
        SERVER_PATH = "${REPO_NAME}"
        BRANCH_NAME = 'main'
    }

    triggers {
        cron('0 1 * * *')  
    }

    stages {
        stage('CI: Checkout Code') {
            steps {
                script {
                    try {
                        sh "git fetch origin ${BRANCH_NAME}"
                        def latestRemoteCommit = sh(script: "git rev-parse origin/${BRANCH_NAME}", returnStdout: true).trim()
                        def latestLocalCommit = sh(script: "git rev-parse HEAD", returnStdout: true).trim()

                        if (latestRemoteCommit != latestLocalCommit) {
                            echo "Changes detected. Checking out latest code..."
                            checkout scm
                        } else {
                            echo "No changes detected. Skipping checkout."
                        }

                        env.REPO_PATH = sh(script: "pwd", returnStdout: true).trim()
                        echo "Using workspace directory: ${env.REPO_PATH}"
                    } catch (Exception e) {
                        echo "Error during checkout: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
                sh "pwd && ls -la"
            }
        }

        stage('Setup Dependencies') {
            steps {
                script {
                    try {
                        sh """
                            # Check Node.js
                            if command -v node > /dev/null 2>&1; then
                                echo "Node.js found. Version: \$(node -v)"
                            else
                                echo "Node.js not found. Please install it."
                                exit 1
                            fi

                            # Check Yarn
                            if command -v yarn > /dev/null 2>&1; then
                                echo "Yarn found. Version: \$(yarn -v)"
                            else
                                echo "Yarn not found. Installing..."
                                npm install -g yarn
                            fi

                            # Check Dependencies
                            if [ -d "node_modules" ]; then
                                echo "node_modules exists. Checking Playwright..."
                                if npx playwright --version > /dev/null 2>&1; then
                                    echo "Playwright already installed."
                                else
                                    echo "Playwright missing. Reinstalling dependencies..."
                                    rm -rf node_modules yarn.lock
                                    yarn install
                                    npx playwright install
                                    yarn add @playwright/test@latest @tenkeylabs/dappwright
                                fi
                            else
                                echo "Installing dependencies..."
                                yarn install
                                npx playwright install
                                yarn add @playwright/test@latest @tenkeylabs/dappwright
                            fi
                        """
                    } catch (Exception e) {
                        echo "Error in Setup Dependencies: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }

        stage('CD: Run Tests') {
            steps {
                script {
                    try {
                        if (isUnix()) {
                            sh """
                                chmod +x ${FILE_SH}
                                ./${FILE_SH}
                            """
                        } else {
                            bat """
                                ${FILE_BAT}
                            """
                        }
                    } catch (Exception e) {
                        echo "❌ Error running tests: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }

        stage('Archive Test Results') {
            steps {
                archiveArtifacts artifacts: '**/playwright-report/**/*', allowEmptyArchive: true
                echo '✅ Test results archived.'
            }
        }
    }

    post {
        always {
            script {
                cleanWs()
                echo "🛑 Build finished with status: ${currentBuild.result}"
            }
        }
    }
}
