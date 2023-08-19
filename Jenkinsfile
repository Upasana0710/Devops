pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        script {
          checkout([$class: 'GitSCM',
          branches: [[name: '*/main']],
          doGenerateSubmoduleConfigurations: false,
          extensions: [[$class: 'CleanBeforeCheckout'], [$class: 'CloneOption', depth: 0, noTags: false, reference: '', shallow: false]],
          submoduleCfg: [],
          userRemoteConfigs: [[credentialsId: 'git-credentials-id', url: 'https://github.com/Upasana0710/Devops.git']]])
        }

      }
    }

    stage('Build Docker Image') {
            steps {
                script {
                    try {
                        def dockerImage = docker.build("jenkins/jenkins:lts")
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
  environment {
    PATH = "/usr/local/bin:$PATH"
    DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials-id')
    EC2_SSH_CREDENTIALS = credentials('ec2-ssh-credentials-id')
  }
}