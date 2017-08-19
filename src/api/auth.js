 import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';

import { AWS_COGNITO_POOL } from '../config';

function newCognitoUser(userName) {
  const userPool = new CognitoUserPool(AWS_COGNITO_POOL);

  const userData = {
    Username: userName,
    Pool: userPool
  }

  return new CognitoUser(userData);
}

export function requestSignup(info) {
  const userPool = new CognitoUserPool(AWS_COGNITO_POOL);

  var attributeList = [];

  attributeList.push(new CognitoUserAttribute({
    Name: 'preferred_username',
    Value: info.userName
  }));

  attributeList.push(new CognitoUserAttribute({
    Name: 'name',
    Value: info.name
  }));

  attributeList.push(new CognitoUserAttribute({
    Name: 'email',
    Value: info.email
  }));

  attributeList.push(new CognitoUserAttribute({
    Name: 'phone_number',
    Value: info.phoneNumber
  }));

  attributeList.push(new CognitoUserAttribute({
    Name: 'custom:zipcode',
    Value: info.zipCode
  }));

  return new Promise((resolve, reject) =>
    userPool.signUp(info.email, info.password, attributeList, null, function(err, result){
      if (err) {
          return reject(err);
      }
      // const cognitoUser = result.user;
      // resolve(cognitoUser.getUsername());
      resolve(info.email);
    })
  ).then(response => response,
	   err => {
       throw err;
     }
  );
}

export function requestConfirmUser(userName, verificationCode) {
  const cognitoUser = newCognitoUser(userName);

  return new Promise((resolve, reject) =>
    cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
      if (err) {
          return reject(err);
      }
      resolve(result);
    })
  ).then(response => response,
	   err => {
       throw err;
     }
  );
}

export function requestResendCode(userName) {
  const cognitoUser = newCognitoUser(userName);

  return new Promise((resolve, reject) =>
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    })
  ).then(response => response,
	   err => {
       throw err;
     }
  );
}

export function requestLogin(userName, password) {

  const authData = {
    Username: userName,
    Password: password
  };

  const authDetails = new AuthenticationDetails(authData);

  const cognitoUser = newCognitoUser(userName);

  return new Promise((resolve, reject) =>
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: result => resolve(result),
      onFailure: err => reject(err)
    })
  ).then(response => response,
	   err => {
       throw err;
     }
  );
}

export function requestLogout() {
  const cognitoUser = getCurrentUser();
  cognitoUser.signOut();
}

export function requestResetPassword(userName) {
  const userPool = new CognitoUserPool(AWS_COGNITO_POOL);

  const userData = {
    Username: userName,
    Pool: userPool
  }

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) =>
    cognitoUser.forgotPassword({
      onSuccess: data => resolve(data),
      onFailure: err => reject(err)
    })
  ).then(response => response,
	   err => {
       throw err;
     }
  );
}

export function requestConfirmPassword(userName, verificationCode, newPassword) {
  const cognitoUser = newCognitoUser(userName);

  return new Promise((resolve, reject) =>
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: data => resolve(data),
      onFailure: err => reject(err)
    })
  ).then(response => response,
	   err => {
       throw err;
     }
  );
}

export function getCurrentUser() {

  const userPool = new CognitoUserPool(AWS_COGNITO_POOL);
  const cognitoUser = userPool.getCurrentUser();

  return cognitoUser;
}

export function getSession() {
  var cognitoUser = getCurrentUser();

  if (cognitoUser === null) {
    throw new Error('No Current User');
  } else {

    return new Promise((resolve, reject) =>
      cognitoUser.getSession((err, result) => {
        if (err) reject(err);
        resolve(result);
      })
    ).then(response => response,
  	   err => {
         throw err;
       }
    );

  }
}
