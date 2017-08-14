import Types from './types';

export const loginRequested = (email, password, remember) =>
  ({ type: Types.LOGIN_REQUESTED, email: email, password: password, remember: remember });

export const loginSucceeded = (user) =>
  ({ type: Types.LOGIN_SUCCEEDED, user: user });

export const loginFailed = (err) =>
  ({ type: Types.LOGIN_FAILED, err: err });


export const getCurrentUser = () =>
  ({ type: Types.GET_CURRENT_USER });
