import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {
  state: ''
}

/* Handlers */

// Create Activism Page
export const createActivismPageReuested = (state = initialState, action) => {
  return { ...state, state: 'CREATING_ACTIVISM_PAGE' }
}

export const createActivismPageSucceeded = (state = initialState, action) => {
  return { ...state, state: 'CREATE_ACTIVISM_PAGE_SUCCEEDED', result: action.result }
}

export const createActivismPageFailed = (state = initialState, action) => {
  return { ...state, state: 'CREATE_ACTIVISM_PAGE_FAILED', err: action.err }
}

// map action types to reducer functions
export const handlers = {
  [Types.CREATE_ACTIVISM_PAGE_REQUESTED]: createActivismPageReuested,
  [Types.CREATE_ACTIVISM_PAGE_SUCCEEDED]: createActivismPageSucceeded,
  [Types.CREATE_ACTIVISM_PAGE_FAILED]: createActivismPageFailed
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
