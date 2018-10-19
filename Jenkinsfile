pipeline {
  agent any
  stages {
    stage('Install packages') {
      steps {
        bat(script: 'npm install', returnStdout: true)
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
    stage('Download APK') {
      steps {
        powershell '''
          Write-Output 'File download completed.'
        '''
      }
    }
  }
  environment {
    EXPO_CREDS = credentials('4b1bd2cf-aedd-49a6-bfe3-19fbe8c07bf0')
  }
}
