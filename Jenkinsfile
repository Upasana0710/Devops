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

    stage('Push to Docker Hub') {
      steps {
        script {
          def dockerHubCredentials = credentials('docker-hub-credentials-id')
          def dockerImageName = 'upasana0710/notes'

          docker.withRegistry("https://index.docker.io/v1/", dockerHubCredentials) {
            sh "docker tag jenkins/jenkins:lts ${notes}:${env.BUILD_NUMBER}"
            sh "docker push ${notes}:${env.BUILD_NUMBER}"
          }
        }

      }
    }

    stage('Deploy to EC2') {
      steps {
        script {
          withCredentials([sshUserPrivateKey(credentialsId: 'node_1_private_key', keyFileVariable: 'PRIVATE_KEY_CREDENTIALS')]) {
            sh """
            ssh -o StrictHostKeyChecking=yes -i /var/jenkins_home/node_1.pem ubuntu@ec2-13-235-33-0.ap-south-1.compute.amazonaws.com '
            docker stop notes-container || true
            docker rm notes-container || true
            docker pull ${notes}:${env.BUILD_NUMBER}
            docker run -d --name notes-container -p 80:80 ${notes}:${env.BUILD_NUMBER}
            '
            """
          }
        }

      }
    }

  }
  environment {
    PATH = "/usr/local/bin:/usr/bin:/bin:/usr/bin/yarn:$PATH"
    DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials-id')
    EC2_SSH_CREDENTIALS = credentials('ec2-ssh-credentials-id')
    PRIVATE_KEY_CREDENTIALS = credentials('node_1_private_key')
  }
}