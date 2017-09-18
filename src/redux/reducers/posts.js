import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {
  posts: [], state: 'RESETED_POSTS',
  myPosts: { posts: [], lastKey: undefined }
}

// Handlers

export const resetPosts = (state = initialState) => {
  return { ...state, state: 'RESETED_POSTS', posts: [] }
}

export const resetMyPages = (state = initialState) => {
  return { ...state, state: 'RESETED_MYPOSTS', myPosts: { posts: [], lastKey: null } }
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

// Get My Posts
export const getMyPostsRequested = (state = initialState) => {
  return { ...state, state: 'GETTING_MYPOSTS' }
}

export const getMyPostsSucceeded = (state = initialState, action) => {
  let myPosts = state.myPosts
  myPosts.posts = myPosts.posts.concat(action.result.Items)
  myPosts.lastKey = action.result.LastEvaluatedKey
  state.posts = myPosts.posts
  return { ...state, state: 'GET_MYPOSTS_SUCCEEDED', posts: state.posts, myPosts, result: action.result }
}

export const getMyPostsFailed = (state = initialState, action) => {
  return { ...state, state: 'GET_MYPOSTS_FAILED', err: action.err }
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

// Get a Post
export const getPostRequested = (state = initialState, action) => {
  return { ...state, state: 'GETTING_POST' }
}

export const getPostSucceeded = (state = initialState, action) => {
  return { ...state, state: 'GET_POST_SUCCEEDED', post: action.result }
}

export const getPostFailed = (state = initialState, action) => {
  return { ...state, state: 'GET_POST_FAILED', err: action.err }
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

// Update a Post
export const updatePostRequested = (state = initialState, action) => {
  return { ...state, state: 'UPDATING_POST' }
}

export const updatePostSucceeded = (state = initialState, action) => {
  let post = Object.assign({}, state.post, action.result.updates)
  return { ...state, state: 'UPDATE_POST_SUCCEEDED', post, result: action.result }
}

export const updatePostFailed = (state = initialState, action) => {
  return { ...state, state: 'UPDATE_POST_FAILED', err: action.err }
}

// Delete a Post
export const deletePostRequested = (state = initialState, action) => {
  return { ...state, state: 'DELETING_POST' }
}

export const deletePostSucceeded = (state = initialState, action) => {
  let posts = state.posts
  const index = posts.findIndex(e => (e.post === action.result.post))
  posts.splice(index, 1)

  return { ...state, state: 'DELETE_POST_SUCCEEDED', posts, result: action.result }
}

export const deletePostFailed = (state = initialState, action) => {
  return { ...state, state: 'DELETE_POST_FAILED', err: action.err }
}

// map action types to reducer functions
export const handlers = {
  [Types.RESET_POSTS]: resetPosts,
  [Types.POSTS_FETCH_REQUESTED]: fetchPostsRequested,
  [Types.POSTS_FETCH_SUCCEEDED]: fetchPostsSucceeded,
  [Types.POSTS_FETCH_FAILED]: fetchPostsFailed,

  [Types.GET_MYPOSTS_REQUESTED]: getMyPostsRequested,
  [Types.GET_MYPOSTS_SUCCEEDED]: getMyPostsSucceeded,
  [Types.GET_MYPOSTS_FAILED]: getMyPostsFailed,

  [Types.UPVOTE_POST_REQUESTED]: upvotePostRequested,
  [Types.UPVOTE_POST_SUCCEEDED]: upvotePostSucceeded,
  [Types.UPVOTE_POST_FAILED]: upvotePostFailed,

  [Types.DOWNVOTE_POST_REQUESTED]: downvotePostRequested,
  [Types.DOWNVOTE_POST_SUCCEEDED]: downvotePostSucceeded,
  [Types.DOWNVOTE_POST_FAILED]: downvotePostFailed,

  [Types.FLAG_POST_REQUESTED]: flagPostRequested,
  [Types.FLAG_POST_SUCCEEDED]: flagPostSucceeded,
  [Types.FLAG_POST_FAILED]: flagPostFailed,

  [Types.GET_POST_REQUESTED]: getPostRequested,
  [Types.GET_POST_SUCCEEDED]: getPostSucceeded,
  [Types.GET_POST_FAILED]: getPostFailed,

  [Types.CREATE_POST_REQUESTED]: createPostRequested,
  [Types.CREATE_POST_SUCCEEDED]: createPostSucceeded,
  [Types.CREATE_POST_FAILED]: createPostFailed,

  [Types.UPDATE_POST_REQUESTED]: updatePostRequested,
  [Types.UPDATE_POST_SUCCEEDED]: updatePostSucceeded,
  [Types.UPDATE_POST_FAILED]: updatePostFailed,

  [Types.DELETE_POST_REQUESTED]: deletePostRequested,
  [Types.DELETE_POST_SUCCEEDED]: deletePostSucceeded,
  [Types.DELETE_POST_FAILED]: deletePostFailed,
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
