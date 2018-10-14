pipeline {
  agent any
  stages {
    stage('Install packages') {
      steps {
        sh 'npm install'
      }
    }
    stage('Run tests') {
      steps {
        sh 'npm test --colors'
      }
    }
    stage('Collect test results') {
      steps {
        junit(testResults: 'reports/report.xml', allowEmptyResults: true)
      }
    }
  }
}