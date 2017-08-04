import { createReducer } from 'reduxsauce';
// Import Actions
import Types from '../actions/types';

// Initial State
const initialState = {

};

// Handlers

export const fetchPostsSucceeded = (state = initialState, action) => {
  return { ...state, posts: action.posts };
}

export const fetchPostsFailed = (state = initialState, action) => {
  return { ...state, err: action.err };
}


// map action types to reducer functions
export const handlers = {
  [Types.POSTS_FETCH_SUCCEEDED]: fetchPostsSucceeded,
  [Types.POSTS_FETCH_FAILED]: fetchPostsFailed,
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers);
