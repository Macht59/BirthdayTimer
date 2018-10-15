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
        bat 'npm jest --ci --reporters=default --reporters=jest-junit'
      }
    }
    stage('Collect test results') {
      steps {
        junit(testResults: 'junit.xml', allowEmptyResults: true)
      }
    }
  }
}