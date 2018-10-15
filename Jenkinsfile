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
        bat 'npm test --ci --reporters=default --reporters=jest-junit'
      }
    }
    stage('Collect test results') {
      steps {
        junit(testResults: 'junit.xml', allowEmptyResults: true)
      }
    }
    stage('Build APK with expo') {
      steps {
        bat 'expo logout'
        bat 'expo login macht59 gary5959'
        bat 'expo build:Android'
      }
    }
  }
}