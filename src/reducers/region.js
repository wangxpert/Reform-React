import { createReducer } from 'reduxsauce';
// Import Actions
import Types from '../actions/types';

// Initial State
const initialState = {

};

// Handlers

export const fetchStatesSucceeded = (state = initialState, action) => {
  return { states: action.states };
}

export const fetchStatesFailed = (state = initialState, action) => {
  return { err: action.err };
}

// map action types to reducer functions
export const handlers = {
  [Types.STATES_FETCH_SUCCEEDED]: fetchStatesSucceeded,
  [Types.STATES_FETCH_FAILED]: fetchStatesFailed
}

/* Selectors */

// Get state data
export const getStateData = state => state.app.data;

// Export Reducer
export default createReducer(initialState, handlers);
