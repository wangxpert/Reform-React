import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';

import { AWS_COGNITO_POOL } from '../config';

export function requestLogin(email, password) {

  const authData = {
    Username: email,
    Password: password
  };

  const authDetails = new AuthenticationDetails(authData);

  const userPool = new CognitoUserPool(AWS_COGNITO_POOL);

  const userData = {
    Username: email,
    Pool: userPool
  }

  const cognitoUser = new CognitoUser(userData);

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

export function getCurrentUser() {

  const userPool = new CognitoUserPool(AWS_COGNITO_POOL);
  const cognitoUser = userPool.getCurrentUser();

  return cognitoUser;
}
