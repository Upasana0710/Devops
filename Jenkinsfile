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
          sshagent(credentials: ['ec2-ssh-credentials-id']) {
            sh 'ssh -i "node_1.pem" ubuntu@ec2-13-235-33-0.ap-south-1.compute.amazonaws.com "git pull && yarn && yarn local"'
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