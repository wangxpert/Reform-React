import Types from './types';

// Log in
export const loginRequested = (email, password, remember) =>
  ({ type: Types.LOGIN_REQUESTED, email: email, password: password, remember: remember });

export const loginSucceeded = (user) =>
  ({ type: Types.LOGIN_SUCCEEDED, user: user });

export const loginFailed = (err) =>
  ({ type: Types.LOGIN_FAILED, err: err });

// Log out
export const logoutRequested = () =>
  ({ type: Types.LOGOUT_REQUESTED });

export const logoutSucceeded = (user) =>
  ({ type: Types.LOGOUT_SUCCEEDED });

// Get Logged User
export const getSessionRequested = () =>
  ({ type: Types.GET_SESSION_REQUESTED });

export const getSessionSucceeded = (user) =>
  ({ type: Types.GET_SESSION_SUCCEEDED, user: user });

export const getSessionFailed = (err) =>
  ({ type: Types.GET_SESSION_FAILED, err: err });

// Reset Password Request
export const resetPasswordRequested = () =>
  ({ type: Types.RESET_PASSWORD_REQUESTED });

export const resetPasswordRequestSucceeded = (user) =>
  ({ type: Types.RESET_PASSWORD_REQUEST_SUCCEEDED, user: user });

export const resetPasswordRequestFailed = (err) =>
  ({ type: Types.RESET_PASSWORD_REQUEST_FAILED, err: err });

// Confirm Password
export const confirmPasswordRequested = (verificationCode, newPassword) =>
  ({ type: Types.CONFIRM_PASSWORD_REQUESTED, verificationCode: verificationCode, newPassword: newPassword });

export const confirmPasswordSucceeded = () =>
  ({ type: Types.CONFIRM_PASSWORD_SUCCEEDED });

export const confirmPasswordFailed = (err) =>
  ({ type: Types.CONFIRM_PASSWORD_FAILED, err: err });
