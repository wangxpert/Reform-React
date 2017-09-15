import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {

}

/* Handlers */

export const advertiseInquiryRequested = (state = initialState) => {
  return { ...state, state: 'REQUESTING_ADVERTISE_INQUIRY' }
}

export const advertiseInquirySucceeded = (state = initialState, action) => {
  return { ...state, state: 'ADVERTISE_INQUIRY_SUCCEEDED', result: action.result }
}

export const advertiseInquiryFailed = (state = initialState, action) => {
  return { ...state, state: 'ADVERTISE_INQUIRY_FAILED', err: action.err }
}

// map action types to reducer functions
export const handlers = {
  [Types.ADVERTISE_INQUIRY_REQUESTED]: advertiseInquiryRequested,
  [Types.ADVERTISE_INQUIRY_SUCCEEDED]: advertiseInquirySucceeded,
  [Types.ADVERTISE_INQUIRY_FAILED]: advertiseInquiryFailed,
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
