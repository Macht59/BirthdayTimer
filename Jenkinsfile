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
        powershell (returnStdout: true, script:'''
          #DO
          #{
              Write-Output "Checking build status..."
              $buildStatusOutput = expo build:status
              $buildStatusOutput = $buildStatusOutput -join '---'
              #$isMatch = $buildStatusOutput -match "\\[\\d{2}:\\d{2}:\\d{2}\\]\\s###\\s*0\\s\\|\\sAndroid\\s\\|\\shttps:\\/\\/expo.io\\/builds\\/[\\w-]+\\s###---\\[\\d{2}:\\d{2}:\\d{2}\\]\\sBuild\\sfinished.---\\[\\d{2}:\\d{2}:\\d{2}\\]\\sAPK:\\s(https:\\/\\/[\\w-\\.\\/%]+\\.apk)"
              #if ($isMatch){
              #    Write-Output "Build was completed. Starting APK download..."
              #} else {
              #    Write-Output "Build is still in process. Will check again in 30 seconds."
              #    Start-Sleep -Seconds 30
              #}
          #} While (!$isMatch)
          #$url = $Matches[1]
          #Import-Module BitsTransfer
          #Start-BitsTransfer -Source $url -Destination "BirthdayTimer.apk"
          Write-Output "File download completed."''')
      }
    }
  }
  environment {
    EXPO_CREDS = credentials('4b1bd2cf-aedd-49a6-bfe3-19fbe8c07bf0')
  }
}
