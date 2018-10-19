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
    stage('Build') {
      steps {
        bat 'expo logout'
        bat 'expo login -u %EXPO_CREDS_USR% -p %EXPO_CREDS_PSW%'
        bat 'expo ba --no-publish --no-wait'
        powershell(returnStdout: true, script: '''
          DO
          {
              Write-Information "Checking build status..."
              $buildStatusInformation = expo build:status
              $buildStatusOutput = $buildStatusOutput -join \'---\'
              $bs = '\\';
              $successPattern = "$($bs)[$($bs)d{2}:$($bs)d{2}:$($bs)d{2}$($bs)]$($bs)CUs###$($bs)s*0$($bs)s$($bs)|$($bs)sAndroid$($bs)s$($bs)|$($bs)shttps:$($bs)/$($bs)/expo.io$($bs)/builds$($bs)/[$($bs)w-]+$($bs)s###---$($bs)[$($bs)d{2}:$($bs)d{2}:$($bs)d{2}$($bs)]$($bs)sBuild$($bs)sfinished.---$($bs)[$($bs)d{2}:$($bs)d{2}:$($bs)d{2}$($bs)]$($bs)sAPK:$($bs)s(https:$($bs)/$($bs)/[$($bs)w-$($bs).$($bs)/%]+$($bs).apk)"
              Write-Information $successPattern
              $isMatch = $buildStatusOutput -match $successPattern
              if ($isMatch){
                  Write-Information "Build was completed. Starting APK download..."
              } else {
                  $errorPattern = "###$($bs)s*0$($bs)s$($bs)|$($bs)sAndroid$($bs)s$($bs)|$($bs)shttps:$($bs)/$($bs)/expo.io$($bs)/builds$($bs)/[$($bs)w-]+$($bs)s###---$($bs)[$($bs)d{2}:$($bs)d{2}:$($bs)d{2}$($bs)]$($bs)sThere was an error with this build$($bs)."
                  Write-Information $errorPattern
                  $isError = $buildStatusOutput -match $errorPattern
                  if ($isError){
                      Write-Error "Build has failed on EXPO server."
                      return;
                  } else {
                    Write-Information $buildStatusOutput
                    Write-Information "Build is still in process. Will check again in 30 seconds."
                    Start-Sleep -Seconds 30
                  }
              }
          } While (!$isMatch)
          $url = $Matches[1]
          Import-Module BitsTransfer
          Start-BitsTransfer -Source $url -Destination "BirthdayTimer.apk"
          Write-Information "File download completed."''')
        archiveArtifacts 'BirthdayTimer.apk'
      }
    }
  }
  environment {
    EXPO_CREDS = credentials('4b1bd2cf-aedd-49a6-bfe3-19fbe8c07bf0')
  }
}