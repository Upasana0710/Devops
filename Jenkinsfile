pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials-id')
        EC2_SSH_CREDENTIALS = credentials('ec2-ssh-credentials-id')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("<DOCKERHUB_REPO>:${env.BUILD_ID}")
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sshagent(credentials: ['<EC2_SSH_CREDENTIALS_ID>']) {
                        def remoteCommands = """
                            docker stop my-app-container || true
                            docker rm my-app-container || true
                            docker pull <DOCKERHUB_REPO>:${env.BUILD_ID}
                            docker run -d -p 5000:5000 --name my-app-container <DOCKERHUB_REPO>:${env.BUILD_ID}
                        """
                        sshCommand remote: "<SSH_USER>@<EC2_INSTANCE_IP>", command: remoteCommands
                    }
                }
            }
        }
    }
}
