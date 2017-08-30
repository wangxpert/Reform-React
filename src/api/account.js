import { getUser } from './auth'
import { uploadFile, deleteFile } from './assets'

import {
 CognitoUserAttribute
} from 'amazon-cognito-identity-js'

import { AWS_S3_AVATAR_FOLDER } from '../config'

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
  return deleteFile(AWS_S3_AVATAR_FOLDER, file)
}

export function uploadAvatar(file) {
  return uploadFile(AWS_S3_AVATAR_FOLDER, file)
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
