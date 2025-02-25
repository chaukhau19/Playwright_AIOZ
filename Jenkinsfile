pipeline {
    agent any
    environment {
        REPO_NAME = 'Playwright_AIOZ'
        FILE_SH = 'AIOZ_Finance.sh'
        FILE_BAT = 'AIOZ_Finance.bat'
        SERVER_PATH = "${REPO_NAME}"
        BRANCH_NAME = 'main'
    }
    tools {
        nodejs 'NodeJS-LTS' // Replace 'NodeJS-LTS' with the actual name you configured in Global Tool Configuration
    }
    triggers {
        cron('0 1 * * *')
    }
    stages {
        stage('CI: Checkout Code') {
            steps {
                script {
                    try {
                        // Checkout main branch
                        sh 'git checkout main'
                        sh 'git remote set-head origin main'
                        sh 'git status'
                        sh 'git remote -v'
                        sh 'git branch -r'

                        def changes = sh(script: "git diff --name-only origin/${BRANCH_NAME}..HEAD", returnStdout: true).trim()
                        if (changes) {
                            echo "Changes detected. Checking out code..."
                            git branch: "${BRANCH_NAME}",
                                url: "https://github.com/chaukhau19/Playwright_AIOZ.git"
                            echo "Code checked out from ${BRANCH_NAME}"
                        } else {
                            echo "No changes detected. Skipping checkout."
                        }

                        env.REPO_PATH = pwd()
                        echo "Using workspace directory: ${env.REPO_PATH}"
                    } catch (Exception e) {
                        echo "Error during checkout: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
                sh """
                    cd ${env.REPO_PATH}
                    pwd
                    ls -la
                """
            }
        }

        stage('Setup Dependencies') {
            steps {
                echo 'Setting up dependencies'
                script {
                    try {
                        sh """
                            cd ${env.REPO_PATH}

                            if [ -d "node_modules" ]; then
                                echo "node_modules already exists. Checking Playwright version..."
                                chmod +x node_modules/.bin/playwright

                                if npx playwright --version; then
                                    echo "Playwright is already installed. Skipping installation."
                                else
                                    echo "Playwright is not installed. Installing..."
                                    rm -rf node_modules yarn.lock
                                    which yarn
                                    yarn --version
                                    whoami
                                    pwd
                                    ls -la
                                    yarn install
                                    npx playwright install
                                    yarn add @playwright/test@latest
                                    yarn add @tenkeylabs/dappwright
                                fi
                            else
                                echo "node_modules does not exist. Installing dependencies..."
                                    which yarn
                                    yarn --version
                                    whoami
                                    pwd
                                    ls -la
                                    yarn install
                                    npx playwright install
                                    yarn add @playwright/test@latest
                                    yarn add @tenkeylabs/dappwright
                            fi
                        """
                    } catch (Exception e) {
                        echo "Error setting up dependencies: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }

        stage('CD: Run Tests') {
            steps {
                echo 'Starting Tests'
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
                echo "Tests executed"
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
        always { //Run this block whether the stage is successful or not.
            script {
                cleanTemporaryFolder()
                if (currentBuild.result == 'SUCCESS') {
                    sendBuildStatusMessage("✅ Status: ${currentBuild.currentResult}")
                } else {
                    sendBuildStatusMessage("❌ Status: ${currentBuild.currentResult}")
                }
            }
        }
    }
}