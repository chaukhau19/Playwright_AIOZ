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
                            # Check & Install Node.js
                            if ! command -v node > /dev/null 2>&1; then
                                echo "⚠️ Node.js not found. Installing..."
                                curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
                                apt-get install -y nodejs
                            else
                                echo "✅ Node.js found. Version: \$(node -v)"
                            fi

                            # Check & Install Yarn
                            if ! command -v yarn > /dev/null 2>&1; then
                                echo "⚠️ Yarn not found. Installing..."
                                npm install -g yarn
                            else
                                echo "✅ Yarn found. Version: \$(yarn -v)"
                            fi

                            # Check & Install Playwright via Yarn
                            if ! yarn playwright --version > /dev/null 2>&1; then
                                echo "⚠️ Playwright not found. Installing..."
                                yarn add @playwright/test@1.48.2 @tenkeylabs/dappwright
                                yarn playwright install --with-deps
                            else
                                echo "✅ Playwright found. Version: \$(yarn playwright --version)"
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
