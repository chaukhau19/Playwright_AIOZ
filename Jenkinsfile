pipeline {
    agent any
    environment {
        REPO_NAME = 'Playwright_AIOZ'
        FILE_SH = 'AIOZ_Finance.sh'
        FILE_BAT = 'AIOZ_Finance.bat'
        SERVER_PATH = "${REPO_NAME}"
        BRANCH_NAME = 'main'
        TEST_SUCCESS = false
    }

    triggers {
        cron('0 1 * * *')  
        // pollSCM('H/5 * * * *') 
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
                            echo "🔍 Checking dependencies..."

                            # --- [Check & Manage Node.js] ---
                            NODE_VERSIONS=\$(ls /usr/bin | grep -E '^node[0-9]*\$' | wc -l)
                            if [ "\$NODE_VERSIONS" -gt 1 ]; then
                                echo "Multiple Node.js versions found. Removing older versions..."
                                sudo apt-get remove --purge nodejs -y || true
                                sudo rm -rf /usr/local/{bin,lib}/node_modules || true
                                echo "Node.js cleaned up."
                            fi
                            if ! command -v node > /dev/null 2>&1; then
                                echo "Node.js not found. Installing..."
                                curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
                                apt-get install -y nodejs
                            else
                                echo "Node.js found. Version: \$(node -v)"
                            fi

                            # --- [Check & Manage Yarn] ---
                            YARN_VERSIONS=\$(yarn --version 2>/dev/null | wc -l)
                            if [ "\$YARN_VERSIONS" -gt 1 ]; then
                                echo "Multiple Yarn versions found. Removing older versions..."
                                npm uninstall -g yarn || true
                                rm -rf ~/.yarn ~/.config/yarn || true
                                echo "Yarn cleaned up."
                            fi
                            if ! command -v yarn > /dev/null 2>&1; then
                                echo "Yarn not found. Installing..."
                                npm install -g yarn
                            else
                                echo "Yarn found. Version: \$(yarn -v)"
                            fi

                            # --- [Check & Manage Playwright] ---
                            PLAYWRIGHT_VERSIONS=\$(yarn list --depth=0 | grep '@playwright/test' | wc -l)
                            if [ "\$PLAYWRIGHT_VERSIONS" -gt 1 ]; then
                                echo "Multiple Playwright versions found. Removing older versions..."
                                rm -rf node_modules package-lock.json yarn.lock || true
                                rm -rf ~/.cache/ms-playwright || true
                                echo "Playwright cleaned up."
                            fi
                            if ! yarn playwright --version > /dev/null 2>&1; then
                                echo "Playwright not found. Installing..."
                                yarn add @playwright/test@latest @tenkeylabs/dappwright
                                yarn playwright install
                            else
                                echo "Playwright found. Version: \$(yarn playwright --version)"
                            fi

                            # Ensure dependencies are installed
                            yarn install
                        """
                    } catch (Exception e) {
                        echo " Error in Setup Dependencies: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }

        stage('Fix Chromium') {
            steps {
                script {
                    sh """
                        if [ -d "/var/lib/jenkins/.cache/ms-playwright/chromium-1155" ]; then
                            echo "🔄 Moving Chromium folder..."
                            mv /var/lib/jenkins/.cache/ms-playwright/chromium-1155 /var/lib/jenkins/.cache/ms-playwright/chromium-1148
                            echo "Moved Chromium successfully."
                        else
                            echo "Chromium-1155 not found. Skipping move."
                        fi
                    """
                }
            }
        }

        stage('CD: Run Tests') {
            steps {
                script {
                    try {
                        def testResult = 1
                        if (isUnix()) {
                            echo "📋 Running tests using ${FILE_SH}"
                            sh "chmod +x ${FILE_SH}"
                            testResult = sh(script: "./${FILE_SH}", returnStatus: true)
                        } else {
                            echo "📋 Running tests using ${FILE_BAT}"
                            testResult = bat(script: "${FILE_BAT}", returnStatus: true)
                        }

                        env.TEST_EXIT_CODE = "${testResult}" 

                        if (testResult == 0) {
                            echo "Tests PASSED!"
                        } else {
                            echo "Tests FAILED with exit code: ${testResult}"
                        }
                    } catch (Exception e) {
                        echo " Error running tests: ${e.getMessage()}"
                        env.TEST_EXIT_CODE = "1"  
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                echo "🔍 Logs can be found at ${SERVER_PATH}/playwright-report/"

                if (env.TEST_EXIT_CODE == '0') {
                    echo "🎉 Build SUCCESS!"
                    currentBuild.result = 'SUCCESS'
                } else {
                    echo "🛑 Build FAILURE: Tests failed!"
                    currentBuild.result = 'FAILURE'
                }
            }
        }
    }
}

def cleanTemporaryFolder() {
    script {
        echo 'Cleaning up temporary files and directories...'
        def pathsToCheck = [
            "${env.REPO_PATH}/package-lock.json",
            "${env.REPO_PATH}/playwright-report",
            "${env.REPO_PATH}/Results",
            "${env.REPO_PATH}/test-results",
            "${env.REPO_PATH}/temp",
            "${env.REPO_PATH}/logs"
        ]
        if (isUnix()) {
            pathsToCheck.each { path ->
                sh "if [ -e '${path}' ]; then echo '${path} exists'; fi"
            }

            sh """
                rm -rf ${env.REPO_PATH}/package-lock.json 
                rm -rf ${env.REPO_PATH}/playwright-report 
                rm -rf ${env.REPO_PATH}/Results 
                rm -rf ${env.REPO_PATH}/test-results 
                rm -rf ${env.REPO_PATH}/temp/*
                rm -rf ${env.REPO_PATH}/logs/*        
                find ${env.REPO_PATH} -name '*.log' -delete  
            """
        } else {
            pathsToCheck.each { path ->
                def winPath = path.replace("/", "\\")
                bat "if exist '${winPath}' (echo '${winPath} exists')"
            }

            bat """
                del /Q ${env.REPO_PATH}\\package-lock.json 
                rmdir /s /q ${env.REPO_PATH}\\playwright-report 
                rmdir /s /q ${env.REPO_PATH}\\Results 
                rmdir /s /q ${env.REPO_PATH}\\test-results 
                del /Q ${env.REPO_PATH}\\temp\\* 
                del /Q ${env.REPO_PATH}\\logs\\*           
                del /Q ${env.REPO_PATH}\\*.log              
            """
        }
    }
}