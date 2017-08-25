import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {

}

// Handlers

export const resetAccount = (state = initialState) => {
  return {}
}

export const getUserInformationRequested = (state = initialState, action) => {
  return { ...state, state: 'GETTING_USER_INFORMATION' }
}

export const getUserInformationSucceeded = (state = initialState, action) => {
  return { ...state, state: 'GET_USER_INFORMATION_SUCCEEDED', user: action.user }
}

export const getUserInformationFailed = (state = initialState, action) => {
  return { ...state, state: 'GET_USER_INFORMATION_FAILED', err: action.err }
}

export const uploadAvatarRequested = (state = initialState, action) => {
  return { ...state, state: 'UPLOADING_AVATAR', file: action.file }
}

export const uploadAvatarSucceeded = (state = initialState, action) => {
  return { ...state, state: 'UPLOAD_AVATAR_SUCCEEDED', result: action.result }
}

export const uploadAvatarFailed = (state = initialState, action) => {
  return { ...state, state: 'UPLOAD_AVATAR_FAILED', err: action.err }
}

// Update User Information
export const updateUserInformationRequested = (state = initialState, action) => {
  return { ...state, state: 'UPDATING_USER_INFORMATION' }
}

export const updateUserInformationSucceeded = (state = initialState, action) => {
  return { ...state, state: 'UPDATE_USER_INFORMATION_SUCCEEDED', result: action.result }
}

export const updateUserInformationFailed = (state = initialState, action) => {
  return { ...state, state: 'UPDATE_USER_INFORMATION_FAILED', err: action.err }
}


// map action types to reducer functions
export const handlers = {
  [Types.RESET_ACCOUNT]: resetAccount,
  [Types.GET_USER_INFORMATION_REQUESTED]: getUserInformationRequested,
  [Types.GET_USER_INFORMATION_SUCCEEDED]: getUserInformationSucceeded,
  [Types.GET_USER_INFORMATION_FAILED]: getUserInformationFailed,

  [Types.UPLOAD_AVATAR_REQUESTED]: uploadAvatarRequested,
  [Types.UPLOAD_AVATAR_SUCCEEDED]: uploadAvatarSucceeded,
  [Types.UPLOAD_AVATAR_FAILED]: uploadAvatarFailed,

  [Types.UPDATE_USER_INFORMATION_REQUESTED]: updateUserInformationRequested,
  [Types.UPDATE_USER_INFORMATION_SUCCEEDED]: updateUserInformationSucceeded,
  [Types.UPDATE_USER_INFORMATION_FAILED]: updateUserInformationFailed
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
