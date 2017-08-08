import { createReducer } from 'reduxsauce';
// Import Actions
import Types from '../actions/types';

// Initial State
const initialState = {

};

// Handlers

export const fetchActivistsSucceeded = (state = initialState, action) => {
  return { ...state, activists: action.activists };
}

export const fetchActivistsFailed = (state = initialState, action) => {
  return { ...state, err: action.err };
}

export const fetchActivistSucceeded = (state = initialState, action) => {
  return { ...state, activist: action.activist };
}

export const fetchActivistFailed = (state = initialState, action) => {
  return { ...state, err: action.err };
}

// map action types to reducer functions
export const handlers = {
  [Types.ACTIVISTS_FETCH_SUCCEEDED]: fetchActivistsSucceeded,
  [Types.ACTIVISTS_FETCH_FAILED]: fetchActivistsFailed,
  [Types.ACTIVIST_FETCH_SUCCEEDED]: fetchActivistSucceeded,
  [Types.ACTIVIST_FETCH_FAILED]: fetchActivistFailed
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers);
