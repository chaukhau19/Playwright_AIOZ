pipeline {
    agent {
        docker { image 'mcr.microsoft.com/playwright:v1.47.2-jammy' }
    }
    environment {
        REPO_NAME = 'Playwright_AIOZ'
        FILE_SH = 'AIOZ_Finance.sh'
        FILE_BAT = 'AIOZ_Finance.bat'
        SERVER_PATH = "${REPO_NAME}"
        // SERVER_PROJECT = ""
        BRANCH_NAME = 'main'
        JENKINS_CREDENTIALS_ID = '6f5eb65d-9009-4049-8b13-1becf88d77cb'
        chatId = '-1002308985537'  
        botToken = '8085219018:AAHSTNao6k9OucZc15LQ476N-039N8NR7WI'
    }
    triggers {
        cron('0 1 * * *')
    }

    stages {
        stage('CI: Checkout Code') {
            steps {
                script {
                    sh "git checkout main"
                    sh "git remote set-head origin main"
                    sh "git status"
                    sh "git remote -v"
                    sh "git branch -r"
                    
                    def changes = sh(script: "git diff --name-only origin/${BRANCH_NAME}..HEAD", returnStdout: true).trim()
                    if (changes) {
                        echo "Changes detected. Checking out code..."
                        git branch: "${BRANCH_NAME}",
                            url: "https://github.com/chaukhau19/Playwright_AIOZ.git"
                        
                        echo "Code checked out from ${BRANCH_NAME}"
                    } else {
                        echo "No changes detected. Skipping checkout."
                    }

                    env.REPO_PATH = sh(script: "find . -type d -name '${REPO_NAME}'", returnStdout: true).trim()
                    if (env.REPO_PATH) {
                        echo "Found ${REPO_NAME} at: ${env.REPO_PATH}"
                    } else {
                        error "Repository directory ${REPO_NAME} not found."
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
                    sh """
                        cd ${env.REPO_PATH}

                        if [ -d "node_modules" ]; then
                            echo "node_modules already exists. Checking Playwright version..."
                            chmod +x node_modules/.bin/playwright

                            if npx playwright --version; then
                                echo "Playwright is already installed. Skipping installation."
                            else
                                echo "Playwright is not installed. Installing..."
                                rm -rf node_modules package-lock.json
                                npm install
                                yarn install
                                npx playwright install
                                npm install @playwright/test@latest
                                yarn add @tenkeylabs/dappwright
                            fi
                        else
                            echo "node_modules does not exist. Installing dependencies..."
                            npm install
                            yarn install
                            npx playwright install
                            npm install @playwright/test@latest
                            yarn add @tenkeylabs/dappwright
                        fi
                    """
                }
            }
        }

        stage('CD: Run Tests') {
            steps {
                echo 'Starting Tests'
                script {
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
        success {
            script {
                sendBuildStatusMessage("✅ Status: ${currentBuild.currentResult}")
                cleanTemporaryFolder()
            }
        }

        failure {
            script {
                sendBuildStatusMessage("❌ Status: ${currentBuild.currentResult}")
                cleanTemporaryFolder()
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

// def sendMessageToTelegram(message) {
//     sh "curl -s -X POST https://api.telegram.org/bot${botToken}/sendMessage -d chat_id=${chatId} -d text='${message}'"
// }


// def sendBuildStatusMessage(statusBuild) {
//     TimeZone timeZone = TimeZone.getTimeZone('GMT+7')
//     def currentDate = new Date().format("dd-MM-yyyy", timeZone)
//     def currentTime = new Date().format("HH:mm:ss", timeZone)
//     def durationMillis = currentBuild.duration ?: 0
//     def minutes = (durationMillis / 60000).toInteger()  
//     def seconds = ((durationMillis % 60000) / 1000).toInteger()  

//     def commitId = env.GIT_COMMIT ?: 'N/A'
//     def branchName = env.GIT_BRANCH ?: 'N/A'
    
//     def message = """
//     🌟🌟 ${statusBuild} 🌟🌟
//     ══════════════════════ 
//     📁 Repository: ${env.REPO_NAME}           
//     📅 Date: ${currentDate} 
//     🕒 Time: ${currentTime}                                  
//     ⏳ Duration: ${minutes} min ${seconds} sec  
//     ══════════════════════
//     🌿 Branch: ${branchName}       
//     🏷️ Commit ID: ${commitId}       
//     🔗 Jenkins Server: ${env.BUILD_URL}       
//     ══════════════════════
//     🔗 Thank you for your attention! 🚀
//     """
    
//     sendMessageToTelegram(message)
// }

