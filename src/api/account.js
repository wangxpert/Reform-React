import { getCurrentUser } from './auth'
import AWS from 'aws-sdk'

import {
 CognitoUserAttribute
} from 'amazon-cognito-identity-js'

import { AWS_CONFIG_REGION, AWS_IDENTITY_POOL_ID, AWS_COGNITO_POOL, AWS_S3_BUCKET_NAME, AWS_S3_AVATAR_FOLDER } from '../config'

import uuidv1 from 'uuid/v1'

export function getUser() {
  var cognitoUser = getCurrentUser()
  cognitoUser.getSession((err, result) => {
    if (err) console.log(err)
  })

  return cognitoUser
}

export function getUserInformation() {
  var cognitoUser = getUser()

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

export function deleteAvatar(file) {
  var cognitoUser = getUser()

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

  const key = encodeURIComponent(AWS_S3_AVATAR_FOLDER) + '/' + file
  return new Promise((resolve, reject) =>
    s3.deleteObject({ Key: key }, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  ).then(response => {
      return response
    }, err => {
      throw err
    }
  )

}

export function uploadAvatar(file) {
  var cognitoUser = getUser()

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

  const key = encodeURIComponent(AWS_S3_AVATAR_FOLDER) + '/' + uuidv1()

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
      return response
    }, err => {
      throw err
    }
  )
}

export function updateUserInformation(info) {
  var cognitoUser = getUser()

  var attributeList = []

  if (info.userName)
    attributeList.push(new CognitoUserAttribute({
      Name: 'preferred_username',
      Value: info.userName
    }))

  if (info.name)
    attributeList.push(new CognitoUserAttribute({
      Name: 'name',
      Value: info.name
    }))

  if (info.zipCode)
    attributeList.push(new CognitoUserAttribute({
      Name: 'custom:zipcode',
      Value: info.zipCode
    }))

  if (info.avatarFile)
    attributeList.push(new CognitoUserAttribute({
      Name: 'picture',
      Value: info.avatar
    }))

  return new Promise((resolve, reject) =>
    cognitoUser.updateAttributes(attributeList, function(err, result) {
      if (err) reject(err)
      else resolve(result)
    })
  ).then(response => {
      return response
    }, err => {
      throw err
    }
  )
}

export function changePassword(oldPassword, newPassword) {
  const cognitoUser = getUser()
  return new Promise((resolve, reject) =>
    cognitoUser.changePassword(oldPassword, newPassword, function(err, result) {
      if (err) reject(err)
      resolve(result)
    })
  ).then(response => {
      return response
    }, err => {
      throw err
    }
  )
}
