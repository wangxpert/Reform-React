import Types from './types';

// Validate For Sign up
export const validateSignUpInfoRequested = (info) =>
  ({ type: Types.VALIDATE_SIGNUP_INFO_REQUESTED, info });

export const validateSignUpInfoSucceeded = (result) =>
  ({ type: Types.VALIDATE_SIGNUP_INFO_SUCCEEDED, result });

export const validateSignUpInfoFailed = (err) =>
  ({ type: Types.VALIDATE_SIGNUP_INFO_FAILED, err: err });

// Sign up
export const signupRequested = (info) =>
  ({ type: Types.SIGNUP_REQUESTED, info });

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
export const loginRequested = (userName, password, remember) =>
  ({ type: Types.LOGIN_REQUESTED, userName, password, remember });

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
export const resetPasswordRequested = (userName) =>
  ({ type: Types.RESET_PASSWORD_REQUESTED, userName });

export const resetPasswordRequestSucceeded = (result) =>
  ({ type: Types.RESET_PASSWORD_REQUEST_SUCCEEDED, result });

export const resetPasswordRequestFailed = (err) =>
  ({ type: Types.RESET_PASSWORD_REQUEST_FAILED, err: err });

// Confirm Password
export const confirmPasswordRequested = (userName, verificationCode, newPassword) =>
  ({ type: Types.CONFIRM_PASSWORD_REQUESTED, userName, verificationCode, newPassword });

export const confirmPasswordSucceeded = (result) =>
  ({ type: Types.CONFIRM_PASSWORD_SUCCEEDED, result });

export const confirmPasswordFailed = (err) =>
  ({ type: Types.CONFIRM_PASSWORD_FAILED, err: err });
