pipeline {
  agent any
  stages {
    stage('Install packages and prepare files') {
      parallel {
        stage('Install packages') {
          steps {
            bat 'npm install'
          }
        }
        stage('Upgrade version code') {
          steps {
            powershell(returnStdout: true, script: '''
              $appJson = Get-Content .\\app.json 
              $matchingRow = $appJson -match \'"versionCode":\\s(\\d+),\'
              $matchingRowIndex = $appJson.IndexOf($matchingRow)
              $versionCodeRow = $appJson[$matchingRowIndex]
              if (!($versionCodeRow -match "\\d+")){
                  throw "Unable to find version code";
              }

              $appJson[$matchingRowIndex] = $versionCodeRow -replace $Matches[0], "$($env:BUILD_NUMBER)"

              Set-Content -Path .\\app.json -Value $appJson

              Write-Information "versionCode updated to $($env:BUILD_NUMBER)"
            ''')
          }
        }
      }
    }
    stage('Test & publish to Expo') {
      parallel {
        stage('Test') {
          steps {
            bat 'npm test --ci --reporters=default --reporters=jest-junit'
            junit 'junit.xml'
          }
        }
        stage('Publish to Expo') {
          steps {
            powershell(script: 'Start-Process expo -ArgumentList "publish"', returnStdout: true)
            powershell 'Start-Sleep -Seconds 300'
          }
        }
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
              Write-Host "Checking build status..."
              $buildStatusOutput = expo build:status
              if ($buildStatusOutput.Length -le 7){
                  throw "Unable to get build status."
              }

              $statusLine = $buildStatusOutput[7];

              if ($statusLine -like "*There was an error with this build*"){
                  throw "Build has failed on EXPO server."
              }

              if ($statusLine -like "*queue*"){
                  Write-Information "The build is in queue. Will check again in 1 minute"
                  Start-Sleep -Seconds 60
                  continue
              }

              if ($statusLine -like "*Build in progress*"){
                  Write-Information "The build is in process. Will check again in 1 minute"
                  Start-Sleep -Seconds 60
                  continue
              }
              
              $isFinished = $statusLine -like "*Build finished*";
              if ($isFinished){
                  Write-Information "Build was completed."
                  $buildStatusOutput[8] -match "https:.+apk"
              } else {
                  throw "Unknown build status: $statusLine"
              }

          } While (!$isFinished)

          Write-Information "File download starting..."
          $url = $Matches[0]
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