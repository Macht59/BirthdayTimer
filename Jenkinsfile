pipeline {
  agent any
  stages {
    stage('Install packages') {
      steps {
        bat 'npm install'
      }
    }
    stage('Test') {
      steps {
        bat 'npm test --ci --reporters=default --reporters=jest-junit'
        junit 'junit.xml'
      }
    }
    stage('Build APK') {
      steps {
        bat 'expo logout'
        bat 'expo login -u %EXPO_CREDS_USR% -p %EXPO_CREDS_PSW%'
      }
    }
  }
  environment {
    EXPO_CREDS = credentials('4b1bd2cf-aedd-49a6-bfe3-19fbe8c07bf0')
  }
}