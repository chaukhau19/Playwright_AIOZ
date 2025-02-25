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
                        sh 'git fetch origin ${BRANCH_NAME}'
                        def changes = sh(script: "git diff --name-only origin/${BRANCH_NAME}..HEAD", returnStdout: true).trim()
                        if (changes) {
                            echo "Changes detected. Checking out code..."
                            git branch: "${BRANCH_NAME}",
                                url: "https://github.com/chaukhau19/Playwright_AIOZ.git"
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
                sh "cd ${env.REPO_PATH} && pwd && ls -la"
            }
        }

        stage('Setup Dependencies') {
            steps {
                script {
                    try {
                        sh """
                            cd ${env.REPO_PATH}

                           if [ -d "node_modules" ]; then
                                echo "node_modules exists. Checking Playwright..."
                                chmod +x node_modules/.bin/playwright
                                if npx playwright --version; then
                                    echo "Playwright is already installed."
                                else
                                    echo "Installing Playwright..."
                                    rm -rf node_modules yarn.lock
                                    yarn install
                                    npx playwright install
                                    yarn add @playwright/test@latest
                                    yarn add @tenkeylabs/dappwright
                                fi
                            else
                                echo "Installing dependencies..."
                                npm install
                                npx playwright install
                                yarn add @playwright/test@latest
                                yarn add @tenkeylabs/dappwright
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
                                cd ${env.REPO_PATH}
                                chmod +x ${FILE_SH}
                                ./${FILE_SH}
                            """
                        } else {
                            bat """
                                cd ${env.REPO_PATH}
                                ${FILE_BAT}
                            """
                        }
                    } catch (Exception e) {
                        echo "Error running tests: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }

        stage('Archive Test Results') {
            steps {
                archiveArtifacts artifacts: '**/playwright-report/**/*', allowEmptyArchive: true
                echo 'Test results archived.'
            }
        }
    }

    post {
        always {
            script {
                cleanWs()
                echo "Build finished with status: ${currentBuild.result}"
            }
        }
    }
}
