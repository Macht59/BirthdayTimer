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
        bat 'npm test --colors'
      }
    }
    stage('Collect test results') {
      steps {
        junit(testResults: 'reports/report.xml', allowEmptyResults: true)
      }
    }
  }
}