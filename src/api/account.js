import { getCurrentUser } from './auth'
import AWS from 'aws-sdk'

import { AWS_CONFIG_REGION, AWS_IDENTITY_POOL_ID, AWS_COGNITO_POOL, AWS_S3_BUCKET_NAME } from '../config'
import uniqid from 'uniqid'

export function requestUserInformation() {
  var cognitoUser = getCurrentUser()
  cognitoUser.getSession((err, result) => {
    if (err) console.log(err)
  })

  return new Promise((resolve, reject) =>
    cognitoUser.getUserAttributes(function(err, result) {
        if (err) reject(err)
        else resolve(result)
    })
  ).then(response => {
      var user = {}
      response.forEach(e => {
        user[e.getName()] = e.getValue()
      })
      return user
    }, err => {
       throw err
     }
  )
}

export function uploadAvatar(file) {
  var cognitoUser = getCurrentUser()
  cognitoUser.getSession((err, result) => {
    if (err) console.log(err)
  })

  AWS.config.region = AWS_CONFIG_REGION

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId : AWS_IDENTITY_POOL_ID, // your identity pool id here
      Logins : {
          // Change the key below according to the specific region your user pool is in.
          [`cognito-idp.${ AWS_CONFIG_REGION }.amazonaws.com/${ AWS_COGNITO_POOL.UserPoolId }`] : cognitoUser.signInUserSession.getIdToken().getJwtToken()
      }
  })

  var s3 = new AWS.S3({
    apiVersion: cognitoUser.pool.client.config.apiVersion,
    params: { Bucket: AWS_S3_BUCKET_NAME }
  })

  const key = encodeURIComponent('avatars') + '/' + uniqid()

  return new Promise((resolve, reject) =>
    s3.upload({
      Key: key,
      Body: file,
      ACL: 'public-read'
    }, function(err, data) {
      if (err) reject(err)
      resolve(data)
    })
  ).then(response => {
    console.log(response)
      return response
    }, err => {
       throw err
     }
  )
}
