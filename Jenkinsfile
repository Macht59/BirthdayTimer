pipeline {
  agent any
  stages {
    stage('Install packages') {
      steps {
        bat(script: 'npm install', returnStatus: true, returnStdout: true)
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
        powershell 'Start-Process -FilePath expo -ArgumentList "build:android" -NoNewWindow -Wait -RedirectStandardOutput buildAndroidOutput.txt'
      }
    }
    stage('Download APK') {
      steps {
        powershell '''$ouputFilePath = Join-Path $PWD "buildAndroidOutput.txt"         
        $text = [IO.File]::ReadAllText($ouputFilePath)         
        $text -match \'https:\\/\\/expo\\.io\\/artifacts\\/.+\'         
        $url = $Matches[0]         
        Invoke-WebRequest -Uri $url -OutFile "BirthdayTimer.apk"'''
      }
    }
  }
  environment {
    EXPO_CREDS = credentials('4b1bd2cf-aedd-49a6-bfe3-19fbe8c07bf0')
  }
}
