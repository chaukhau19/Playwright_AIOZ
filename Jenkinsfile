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
    }

    stages {
        stage('CI: Checkout Code') {
            steps {
                script {
                    try {
                        sh "sudo chown -R jenkins:jenkins /var/lib/jenkins/workspace/Automation_AIOZ_Finance_main"
                        sh "sudo chmod -R 755 /var/lib/jenkins/workspace/Automation_AIOZ_Finance_main"
                        
                        // Reset code về trạng thái sạch trước khi fetch code mới
                        sh "git reset --hard HEAD"
                        sh "git clean -fd"
                        
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
                            NODE_VERSIONS=$(ls /usr/bin | grep -E '^node[0-9]*$' | wc -l)
                            if [ "$NODE_VERSIONS" -gt 1 ]; then
                                echo "⚠️ Multiple Node.js versions found. Removing older versions..."
                                sudo apt-get remove --purge nodejs -y || true
                                sudo rm -rf /usr/local/{bin,lib}/node_modules || true
                                echo "✅ Node.js cleaned up."
                            fi
                            if ! command -v node > /dev/null 2>&1; then
                                echo "⚠️ Node.js not found. Installing..."
                                curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
                                apt-get install -y nodejs
                            else
                                echo "✅ Node.js found. Version: $(node -v)"
                            fi

                            # Ensure dependencies are installed
                            yarn install
                        """
                    } catch (Exception e) {
                        echo "❌ Error in Setup Dependencies: ${e.getMessage()}"
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
                            echo "✅ Moved Chromium successfully."
                        else
                            echo "⚠️ Chromium-1155 not found. Skipping move."
                        fi
                    """
                }
            }
        }

        stage('CD: Run Tests') {
            steps {
                script {
                    try {
                        sh "Xvfb :99 -screen 0 1920x1080x24 & export DISPLAY=:99"
                        
                        def testResult = 1
                        if (isUnix()) {
                            echo "📋 Running tests using ${FILE_SH}"
                            sh "chmod +x ${FILE_SH}"
                            testResult = sh(script: "./${FILE_SH}", returnStatus: true)
                        } else {
                            echo "📋 Running tests using ${FILE_BAT}"
                            testResult = bat(script: "${FILE_BAT}", returnStatus: true)
                        }
                        
                        if (testResult == 0) {
                            echo "✅ Tests completed successfully"
                            env.TEST_SUCCESS = 'true'
                        } else {
                            echo "⚠️ Tests completed with non-zero exit code: ${testResult}"
                            env.TEST_SUCCESS = 'false'
                        }
                    } catch (Exception e) {
                        echo "❌ Error running tests: ${e.getMessage()}"
                        env.TEST_SUCCESS = 'false'
                    }
                }
            }
        }

        stage('Archive Test Results') {
            steps {
                script {
                    dir(SERVER_PATH) {
                        try {
                            def resultsExist = sh(script: "find playwright-report/ -type f | wc -l", returnStdout: true).trim()
                            if (resultsExist != '0') {
                                echo "📊 Found test results to archive"
                                archiveArtifacts artifacts: "playwright-report/**/*", allowEmptyArchive: true
                                echo "✅ Test results archived successfully"
                            } else {
                                echo "⚠️ No test results found to archive"
                            }
                        } catch (Exception e) {
                            echo "⚠️ Error archiving test results: ${e.getMessage()}"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                echo "🔍 Logs can be found at ${SERVER_PATH}/playwright-report/"
                if (env.TEST_SUCCESS == 'true') {
                    currentBuild.result = 'SUCCESS'
                    echo "🎉 Build finished with status: SUCCESS"
                } else if (currentBuild.result == null) {
                    currentBuild.result = 'UNSTABLE'
                    echo "⚠️ Build finished with status: UNSTABLE (tests ran but with issues)"
                } else {
                    echo "🛑 Build finished with status: ${currentBuild.result}"
                }
            }
        }
    }
}
