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
                checkout scm
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Add your test commands here
                    sh 'npm install' // Example: Install dependencies
                    sh 'npm test'     // Example: Run tests
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("upasana0710/notes-api:${env.BUILD_ID}")
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sshagent(credentials: ['ec2-ssh-credentials-id']) {
                        def remoteCommands = """
                            /usr/local/bin/docker stop my-app-container || true
                            /usr/local/bin/docker rm my-app-container || true
                            /usr/local/bin/docker pull upasana0710/notes-api:${env.BUILD_ID}
                            /usr/local/bin/docker run -d -p 5000:5000 --name my-app-container upasana0710/notes-api:${env.BUILD_ID}
                        """
                        sshCommand remote: "ubuntu@13.235.33.0", command: remoteCommands
                    }
                }
            }
        }
    }
}
