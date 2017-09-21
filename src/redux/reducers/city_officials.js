import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {
  state: '',
  officials: {}
}

/* Handlers */

// Get City Officials
export const getCityOfficialsRequested = (state = initialState, action) => {
  return { ...state, state: 'GETTING_CITY_OFFICIALS' }
}

export const getCityOfficialsSucceeded = (state = initialState, action) => {
  return { state: 'GET_CITY_OFFICIALS_SUCCEEDED', officials: action.result, result: action.result }
}

export const getCityOfficialsFailed = (state = initialState, action) => {
  return { state: 'GET_CITY_OFFICIALS_FAILED', err: action.err }
}

// map action types to reducer functions
export const handlers = {
  [Types.GET_CITY_OFFICIALS_REQUESTED]: getCityOfficialsRequested,
  [Types.GET_CITY_OFFICIALS_SUCCEEDED]: getCityOfficialsSucceeded,
  [Types.GET_CITY_OFFICIALS_FAILED]: getCityOfficialsFailed,
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
