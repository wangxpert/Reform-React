import { createReducer } from 'reduxsauce';
// Import Actions
import Types from '../actions/types';

// Initial State
const initialState = {
  state: 'NOT_LOGGED'
};

/* Handlers */

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
  return { state: 'RESET_PASSWORD_REQUESTED' };
}

export const resetPasswordRequestFailed = (state = initialState, action) => {
  return { state: 'RESET_PASSWORD_REQUEST_FAILED', err: action.err };
}

// Confirm Password
export const confirmPasswordRequested = (state = initialState, action) => {
  return { state: 'CONFIRMING_PASSWORD', verificationCode: action.verificationCode, newPassword: action.newPassword };
}

export const confirmPasswordSucceeded = (state = initialState, action) => {
  return { state: 'CONFIRM_PASSWORD_SUCCEEDED' };
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
  [Types.LOGIN_REQUESTED]: loginRequested,
  [Types.LOGIN_SUCCEEDED]: loginSucceeded,
  [Types.LOGIN_FAILED]: loginFailed,

  [Types.LOGOUT_REQUESTED]: logoutRequested,
  [Types.LOGOUT_SUCCEEDED]: logoutSucceeded,

  [Types.RESET_PASSWORD_REQUESTED]: resetPasswordRequested,
  [Types.RESET_PASSWORD_REQUEST_SUCCEEDED]: resetPasswordRequestSucceeded,
  [Types.RESET_PASSWORD_REQUEST_FAILED]: resetPasswordRequestFailed,

  [Types.CONFIRM_PASSWORD_REQUESTED]: resetPasswordRequested,
  [Types.CONFIRM_PASSWORD_SUCCEEDED]: resetPasswordRequestSucceeded,
  [Types.CONFIRM_PASSWORD_FAILED]: resetPasswordRequestFailed,

  [Types.GET_SESSION_REQUESTED]: getSessionRequested,
  [Types.GET_SESSION_SUCCEEDED]: getSessionSucceeded,
  [Types.GET_SESSION_FAILED]: getSessionFailed
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers);
