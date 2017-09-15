import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {

}

/* Handlers */

export const blowWhistleRequested = (state = initialState) => {
  return { ...state, state: 'BLOWING_WHISTLE' }
}

export const blowWhistleSucceeded = (state = initialState, action) => {
  return { ...state, state: 'BLOW_WHISTLE_SUCCEEDED', result: action.result }
}

export const blowWhistleFailed = (state = initialState, action) => {
  return { ...state, state: 'BLOW_WHISTLE_FAILED', err: action.err }
}

// map action types to reducer functions
export const handlers = {
  [Types.BLOW_WHISTLE_REQUESTED]: blowWhistleRequested,
  [Types.BLOW_WHISTLE_SUCCEEDED]: blowWhistleSucceeded,
  [Types.BLOW_WHISTLE_FAILED]: blowWhistleFailed,
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
