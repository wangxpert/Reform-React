import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {

}

/* Handlers */

export const submitFeedbackRequested = (state = initialState) => {
  return { ...state, state: 'SUBMITTING_FEEDBACK' }
}

export const submitFeedbackSucceeded = (state = initialState, action) => {
  return { ...state, state: 'SUBMIT_FEEDBACK_SUCCEEDED', result: action.result }
}

export const submitFeedbackFailed = (state = initialState, action) => {
  return { ...state, state: 'SUBMIT_FEEDBACK_FAILED', err: action.err }
}

// map action types to reducer functions
export const handlers = {
  [Types.SUBMIT_FEEDBACK_REQUESTED]: submitFeedbackRequested,
  [Types.SUBMIT_FEEDBACK_SUCCEEDED]: submitFeedbackSucceeded,
  [Types.SUBMIT_FEEDBACK_FAILED]: submitFeedbackFailed,
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
