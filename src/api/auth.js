 import {
  CognitoUserPool,
  // CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';

import { AWS_COGNITO_POOL } from '../config';

function newCognitoUser(email) {
  const userPool = new CognitoUserPool(AWS_COGNITO_POOL);

  const userData = {
    Username: email,
    Pool: userPool
  }

  return new CognitoUser(userData);
}

export function requestLogin(email, password) {

  const authData = {
    Username: email,
    Password: password
  };

  const authDetails = new AuthenticationDetails(authData);

  const cognitoUser = newCognitoUser(email);

  return new Promise((resolve, reject) =>
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: result => resolve(result),
      onFailure: err => reject(err)
    })
  ).then(response => response,
	   err => {
       throw new Error(err);
     }
  );
}

export function requestLogout() {
  const cognitoUser = getCurrentUser();
  cognitoUser.signOut();
}

export function requestResetPassword(email) {
  const userPool = new CognitoUserPool(AWS_COGNITO_POOL);

  const userData = {
    Username: email,
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
       throw new Error(err);
     }
  );
}

export function requestConfirmPassword(email, verificationCode, newPassword) {
  const cognitoUser = newCognitoUser(email);

  return new Promise((resolve, reject) =>
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: data => resolve(data),
      onFailure: err => reject(err)
    })
  ).then(response => response,
	   err => {
       throw new Error(err);
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
         throw new Error(err);
       }
    );

  }
}
