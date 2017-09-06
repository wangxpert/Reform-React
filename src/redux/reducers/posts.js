import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {
  posts: [], state: 'RESETED_POSTS'
}

// Handlers

export const resetPosts = (state = initialState) => {
  return { state: 'RESETED_POSTS', posts: [] }
}

export const fetchPostsRequested = (state = initialState) => {
  return { ...state, state: 'FETCHING_POSTS' }
}

export const fetchPostsSucceeded = (state = initialState, action) => {
  return { ...state, state: 'FETCH_POSTS_SUCCEEDED', posts: [ ...state.posts, ...action.posts.Items ], lastKey: action.posts.LastEvaluatedKey }
}

export const fetchPostsFailed = (state = initialState, action) => {
  return { ...state, state: 'FETCH_POSTS_FAILED', err: action.err }
}


export const upvotePostRequested = (state = initialState) => {
  return { ...state, state: 'UPVOTING_POST' }
}

export const upvotePostSucceeded = (state = initialState, action) => {
  const post = state.posts.find(e => (e.state === action.state && e.city === action.city && e.department === action.department && e.post === action.post))
  post.upvotes++
  return { ...state, state: 'UPVOTE_POST_SUCCEEDED' }
}

export const upvotePostFailed = (state = initialState, action) => {
  return { ...state, state: 'UPVOTE_POST_FAILED', err: action.err }
}


// map action types to reducer functions
export const handlers = {
  [Types.RESET_POSTS]: resetPosts,
  [Types.POSTS_FETCH_REQUESTED]: fetchPostsRequested,
  [Types.POSTS_FETCH_SUCCEEDED]: fetchPostsSucceeded,
  [Types.POSTS_FETCH_FAILED]: fetchPostsFailed,
  [Types.UPVOTE_POST_REQUESTED]: upvotePostRequested,
  [Types.UPVOTE_POST_SUCCEEDED]: upvotePostSucceeded,
  [Types.UPVOTE_POST_FAILED]: upvotePostFailed
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
