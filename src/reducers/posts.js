import { createReducer } from 'reduxsauce';
// Import Actions
import Types from '../actions/types';

// Initial State
const initialState = {
  posts: []
};

// Handlers

export const resetPosts = (state = initialState) => {
  return { posts: [] };
}

export const fetchPostsSucceeded = (state = initialState, action) => {
  return { ...state, posts: [ ...state.posts, ...action.posts.Items ], lastKey: action.posts.LastEvaluatedKey };
}

export const fetchPostsFailed = (state = initialState, action) => {
  return { ...state, err: action.err };
}


export const upvotePostRequested = (state = initialState) => {
  return { ...state };
}

export const upvotePostSucceeded = (state = initialState, action) => {
  return { ...state };
}

export const upvotePostFailed = (state = initialState, action) => {
  return { ...state, err: action.err };
}



// map action types to reducer functions
export const handlers = {
  [Types.RESET_POSTS]: resetPosts,
  [Types.POSTS_FETCH_SUCCEEDED]: fetchPostsSucceeded,
  [Types.POSTS_FETCH_FAILED]: fetchPostsFailed,
  [Types.UPVOTE_POST_REQUESTED]: upvotePostRequested,
  [Types.UPVOTE_POST_SUCCEEDED]: upvotePostSucceeded,
  [Types.UPVOTE_POST_FAILED]: upvotePostFailed
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers);
