import { createReducer } from 'reduxsauce';
// Import Actions
import Types from '../actions/types';

// Initial State
const initialState = {
  user: {},
  state: 'NOT_LOGGED'
};

// Handlers

export const loginRequested = (state = initialState, action) => {
  return { state: 'LOGGING' };
}

export const loginSucceeded = (state = initialState, action) => {
  return { user: action.user, state: 'LOGGED' };
}

export const loginFailed = (state = initialState, action) => {
  return { ...state, err: action.err, state: 'NOT_LOGGED' };
}

export const getCurrentUser = (state = initialState, action) => {
  return { ...state, user: action.user };
}

// map action types to reducer functions
export const handlers = {
  [Types.LOGIN_REQUESTED]: loginRequested,
  [Types.LOGIN_SUCCEEDED]: loginSucceeded,
  [Types.LOGIN_FAILED]: loginFailed,
  [Types.GET_CURRENT_USER]: getCurrentUser
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers);
