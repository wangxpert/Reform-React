import { createReducer } from 'reduxsauce';
// Import Actions
import Types from '../actions/types';

// Initial State
const initialState = {
  state: 'NOT_LOGGED'
};

/* Handlers */

// Sign up
export const signupRequested = (state = initialState, action) => {
  return { state: 'SIGNING_UP' }
}

export const signupSucceeded = (state = initialState, action) => {
  return { state: 'SIGNUP_SUCCEEDED' };
}

export const signupFailed = (state = initialState, action) => {
  return { state: 'SIGNUP_FAILED', err: action.err };
}

// Confirm User
export const confirmUserRequested = (state = initialState, action) => {
  return { state: 'CONFIRMING_USER' }
}

export const confirmUserSucceeded = (state = initialState, action) => {
  return { state: 'CONFIRM_USER_SUCCEEDED', result: action.result }
}

export const confirmUserFailed = (state = initialState, action) => {
  return { state: 'CONFIRM_USER_FAILED', err: action.err }
}

// Resend Verification Code
export const resendCodeRequested = (state = initialState, action) => {
  return { state: 'RESENDING_CODE' }
}

export const resendCodeSucceeded = (state = initialState, action) => {
  return { state: 'RESEND_CODE_SUCCEEDED', result: action.result }
}

export const resendCodeFailed = (state = initialState, action) => {
  return { state: 'RESEND_CODE_FAILED', err: action.err }
}

// Log in
export const loginRequested = (state = initialState, action) => {
  return { state: 'LOGGING_IN' };
}

export const loginSucceeded = (state = initialState, action) => {
  return { state: 'LOGGED', user: action.user };
}

export const loginFailed = (state = initialState, action) => {
  return { state: 'NOT_LOGGED', err: action.err };
}

// Log out
export const logoutRequested = (state = initialState, action) => {
  return { state: 'LOGGING_OUT' };
}

export const logoutSucceeded = (state = initialState, action) => {
  return { state: 'NOT_LOGGED' };
}

// Reset Password Request
export const resetPasswordRequested = (state = initialState, action) => {
  return { state: 'REQUESTING_RESET_PASSWORD' };
}

export const resetPasswordRequestSucceeded = (state = initialState, action) => {
  return { state: 'RESET_PASSWORD_REQUEST_SUCCEEDED', result: action.result };
}

export const resetPasswordRequestFailed = (state = initialState, action) => {
  return { state: 'RESET_PASSWORD_REQUEST_FAILED', err: action.err };
}

// Confirm Password
export const confirmPasswordRequested = (state = initialState, action) => {
  return { state: 'CONFIRMING_PASSWORD' };
}

export const confirmPasswordSucceeded = (state = initialState, action) => {
  return { state: 'CONFIRM_PASSWORD_SUCCEEDED', result: action.result };
}

export const confirmPasswordFailed = (state = initialState, action) => {
  return { state: 'CONFIRM_PASSWORD_FAILED', err: action.err };
}

// Get Logged User
export const getSessionRequested = (state = initialState, action) => {
  return { state: 'GETTING_SESSION' };
}

export const getSessionSucceeded = (state = initialState, action) => {
  return { state: 'LOGGED', user: action.user };
}

export const getSessionFailed = (state = initialState, action) => {
  return { state: 'NOT_LOGGED', err: action.err };
}

// map action types to reducer functions
export const handlers = {
  [Types.SIGNUP_REQUESTED]: signupRequested,
  [Types.SIGNUP_SUCCEEDED]: signupSucceeded,
  [Types.SIGNUP_FAILED]: signupFailed,

  [Types.CONFIRM_USER_REQUESTED]: confirmUserRequested,
  [Types.CONFIRM_USER_SUCCEEDED]: confirmUserSucceeded,
  [Types.CONFIRM_USER_FAILED]: confirmUserFailed,

  [Types.RESEND_CODE_REQUESTED]: resendCodeRequested,
  [Types.RESEND_CODE_SUCCEEDED]: resendCodeSucceeded,
  [Types.RESEND_CODE_FAILED]: resendCodeFailed,

  [Types.LOGIN_REQUESTED]: loginRequested,
  [Types.LOGIN_SUCCEEDED]: loginSucceeded,
  [Types.LOGIN_FAILED]: loginFailed,

  [Types.LOGOUT_REQUESTED]: logoutRequested,
  [Types.LOGOUT_SUCCEEDED]: logoutSucceeded,

  [Types.RESET_PASSWORD_REQUESTED]: resetPasswordRequested,
  [Types.RESET_PASSWORD_REQUEST_SUCCEEDED]: resetPasswordRequestSucceeded,
  [Types.RESET_PASSWORD_REQUEST_FAILED]: resetPasswordRequestFailed,

  [Types.CONFIRM_PASSWORD_REQUESTED]: confirmPasswordRequested,
  [Types.CONFIRM_PASSWORD_SUCCEEDED]: confirmPasswordSucceeded,
  [Types.CONFIRM_PASSWORD_FAILED]: confirmPasswordFailed,

  [Types.GET_SESSION_REQUESTED]: getSessionRequested,
  [Types.GET_SESSION_SUCCEEDED]: getSessionSucceeded,
  [Types.GET_SESSION_FAILED]: getSessionFailed
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers);
