import { createReducer } from 'reduxsauce';
// Import Actions
import Types from '../actions/types';

// Initial State
const initialState = {
  posts: [],
  nextKey: {}
};

// Handlers

export const resetPosts = (state = initialState) => {
  return { ...state, nextKey: {}, posts: [] };
}

export const fetchPostsSucceeded = (state = initialState, action) => {
  return { ...state, posts: [...state.posts, ...action.posts.Items ], nextKey: action.posts.nextkey };
}

export const fetchPostsFailed = (state = initialState, action) => {
  return { ...state, err: action.err };
}


// map action types to reducer functions
export const handlers = {
  [Types.RESET_POSTS]: resetPosts,
  [Types.POSTS_FETCH_SUCCEEDED]: fetchPostsSucceeded,
  [Types.POSTS_FETCH_FAILED]: fetchPostsFailed,
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers);
