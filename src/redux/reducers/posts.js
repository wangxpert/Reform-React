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

// Upvote Post
export const upvotePostRequested = (state = initialState, action) => {
  return { ...state, state: 'UPVOTING_POST', currentPost: action.post.post }
}

export const upvotePostSucceeded = (state = initialState, action) => {
  let posts = state.posts.slice()
  const post = posts.find(e => (e.post === action.result.post))
  post.upvotes = action.result.updates.upvotes
  post.downvotes = action.result.updates.downvotes

  return { ...state, state: 'UPVOTE_POST_SUCCEEDED', posts, result: action.result }
}

export const upvotePostFailed = (state = initialState, action) => {
  return { ...state, state: 'UPVOTE_POST_FAILED', err: action.err }
}

// Downvote Post
export const downvotePostRequested = (state = initialState, action) => {
  return { ...state, state: 'DOWNVOTING_POST', currentPost: action.post.post }
}

export const downvotePostSucceeded = (state = initialState, action) => {
  let posts = state.posts.slice()
  const post = posts.find(e => (e.post === action.result.post))
  post.downvotes = action.result.updates.downvotes
  post.upvotes = action.result.updates.upvotes

  return { ...state, state: 'DOWNVOTE_POST_SUCCEEDED', posts, result: action.result }
}

export const downvotePostFailed = (state = initialState, action) => {
  return { ...state, state: 'DOWNVOTE_POST_FAILED', err: action.err }
}

// Flag Post
export const flagPostRequested = (state = initialState, action) => {
  return { ...state, state: 'FLAGGING_POST', currentPost: action.post.post }
}

export const flagPostSucceeded = (state = initialState, action) => {
  let posts = state.posts.slice()
  const post = posts.find(e => (e.post === action.result.post))
  post.flags = action.result.updates.flags
  return { ...state, state: 'FLAG_POST_SUCCEEDED', posts, result: action.result }
}

export const flagPostFailed = (state = initialState, action) => {
  return { ...state, state: 'FLAG_POST_FAILED', err: action.err }
}

// Create a Post
export const createPostRequested = (state = initialState, action) => {
  return { ...state, state: 'CREATING_POST' }
}

export const createPostSucceeded = (state = initialState, action) => {
  return { ...state, state: 'CREATE_POST_SUCCEEDED', result: action.result }
}

export const createPostFailed = (state = initialState, action) => {
  return { ...state, state: 'CREATE_POST_FAILED', err: action.err }
}

// map action types to reducer functions
export const handlers = {
  [Types.RESET_POSTS]: resetPosts,
  [Types.POSTS_FETCH_REQUESTED]: fetchPostsRequested,
  [Types.POSTS_FETCH_SUCCEEDED]: fetchPostsSucceeded,
  [Types.POSTS_FETCH_FAILED]: fetchPostsFailed,

  [Types.UPVOTE_POST_REQUESTED]: upvotePostRequested,
  [Types.UPVOTE_POST_SUCCEEDED]: upvotePostSucceeded,
  [Types.UPVOTE_POST_FAILED]: upvotePostFailed,

  [Types.DOWNVOTE_POST_REQUESTED]: downvotePostRequested,
  [Types.DOWNVOTE_POST_SUCCEEDED]: downvotePostSucceeded,
  [Types.DOWNVOTE_POST_FAILED]: downvotePostFailed,

  [Types.FLAG_POST_REQUESTED]: flagPostRequested,
  [Types.FLAG_POST_SUCCEEDED]: flagPostSucceeded,
  [Types.FLAG_POST_FAILED]: flagPostFailed,

  [Types.CREATE_POST_REQUESTED]: createPostRequested,
  [Types.CREATE_POST_SUCCEEDED]: createPostSucceeded,
  [Types.CREATE_POST_FAILED]: createPostFailed,
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
