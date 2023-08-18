pipeline {
    agent any
    environment {
        PATH = "/usr/local/bin:$PATH"
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials-id')
        EC2_SSH_CREDENTIALS = credentials('ec2-ssh-credentials-id')
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    try {
                        checkout scm
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Checkout failed: ${e.message}")
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        def dockerImage = docker.build("jenkins/jenkins:${env.BUILD_ID}")
                        docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
                            dockerImage.push()
                        }
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Docker build failed: ${e.message}")
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    try {
                        sshagent(credentials: ['ec2-ssh-credentials-id']) {
                            def remoteCommands = """
                                /usr/local/bin/docker stop my-app-container || true
                                /usr/local/bin/docker rm my-app-container || true
                                /usr/local/bin/docker pull jenkins/jenkins:${env.BUILD_ID}
                                /usr/local/bin/docker run -d -p 5000:5000 --name my-app-container jenkins/jenkins:${env.BUILD_ID}
                            """
                            sshCommand remote: "ubuntu@13.235.33.0", command: remoteCommands
                        }
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Deployment failed: ${e.message}")
                    }
                }
            }
        }
    }
}
