pipeline {
  agent any
  stages {
    stage('Install packages') {
      steps {
        bat 'npm install'
      }
    }
    stage('Run tests') {
      steps {
        bat 'npm test'
      }
    }
    stage('Collect test results') {
      steps {
        junit(testResults: 'junit.xml', allowEmptyResults: true)
      }
    }
  }
}