import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {
  activists: []
}

// Handlers

export const resetActivists = (state = initialState) => {
  return { activists: [] }
}

export const fetchActivistsSucceeded = (state = initialState, action) => {
  return { ...state, activists: [ ...state.activists, ...action.activists.Items ], lastKey: action.activists.LastEvaluatedKey }
}

export const fetchActivistsFailed = (state = initialState, action) => {
  return { ...state, err: action.err }
}

// map action types to reducer functions
export const handlers = {
  [Types.RESET_ACTIVISTS]: resetActivists,
  [Types.ACTIVISTS_FETCH_SUCCEEDED]: fetchActivistsSucceeded,
  [Types.ACTIVISTS_FETCH_FAILED]: fetchActivistsFailed,
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
