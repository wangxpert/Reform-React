import Types from './types';

// Sign up
export const signupRequested = (info, router) =>
  ({ type: Types.SIGNUP_REQUESTED, info, router  });

export const signupSucceeded = (userName) =>
  ({ type: Types.SIGNUP_SUCCEEDED, userName });

export const signupFailed = (err) =>
  ({ type: Types.SIGNUP_FAILED, err: err });

// Confirm User
export const confirmUserRequested = (userName, verificationCode) =>
  ({ type: Types.CONFIRM_USER_REQUESTED, userName, verificationCode });

export const confirmUserSucceeded = (result) =>
  ({ type: Types.CONFIRM_USER_SUCCEEDED, result });

export const confirmUserFailed = (err) =>
  ({ type: Types.CONFIRM_USER_FAILED, err });

// Resend Verification Code
export const resendCodeRequested = (userName) =>
  ({ type: Types.RESEND_CODE_REQUESTED, userName });

export const resendCodeSucceeded = (result) =>
  ({ type: Types.RESEND_CODE_SUCCEEDED, result });

export const resendCodeFailed = (err) =>
  ({ type: Types.RESEND_CODE_FAILED, err });

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
export const resetPasswordRequested = (email) =>
  ({ type: Types.RESET_PASSWORD_REQUESTED, email: email });

export const resetPasswordRequestSucceeded = (user) =>
  ({ type: Types.RESET_PASSWORD_REQUEST_SUCCEEDED, user: user });

export const resetPasswordRequestFailed = (err) =>
  ({ type: Types.RESET_PASSWORD_REQUEST_FAILED, err: err });

// Confirm Password
export const confirmPasswordRequested = (email, verificationCode, newPassword) =>
  ({ type: Types.CONFIRM_PASSWORD_REQUESTED, email: email, verificationCode: verificationCode, newPassword: newPassword });

export const confirmPasswordSucceeded = () =>
  ({ type: Types.CONFIRM_PASSWORD_SUCCEEDED });

export const confirmPasswordFailed = (err) =>
  ({ type: Types.CONFIRM_PASSWORD_FAILED, err: err });
