import Types from './types'

// Get Post List
export const resetPosts = () =>
  ({ type: Types.RESET_POSTS })

export const postsFetchRequested = (state, city, department, limit = '', lastKey) =>
  ({ type: Types.POSTS_FETCH_REQUESTED, state: state, city: city, department: department, limit: limit, lastKey: lastKey })

export const postsFetchSucceeded = (posts) =>
  ({ type: Types.POSTS_FETCH_SUCCEEDED, posts: posts })

export const postsFetchFailed = (err) =>
  ({ type: Types.POSTS_FETCH_FAILED, err: err })

// Upvote Post
export const upvotePostRequested = (post, idToken) =>
  ({ type: Types.UPVOTE_POST_REQUESTED, post, idToken })

export const upvotePostSucceeded = (result) =>
  ({ type: Types.UPVOTE_POST_SUCCEEDED, result })

export const upvotePostFailed = (err) =>
  ({ type: Types.UPVOTE_POST_FAILED, err: err })

// Downvote Post
export const downvotePostRequested = (post, idToken) =>
  ({ type: Types.DOWNVOTE_POST_REQUESTED, post, idToken })

export const downvotePostSucceeded = (result) =>
  ({ type: Types.DOWNVOTE_POST_SUCCEEDED, result })

export const downvotePostFailed = (err) =>
  ({ type: Types.DOWNVOTE_POST_FAILED, err: err })

// Flag Post
export const flagPostRequested = (post, idToken) =>
  ({ type: Types.FLAG_POST_REQUESTED, post, idToken })

export const flagPostSucceeded = (result) =>
  ({ type: Types.FLAG_POST_SUCCEEDED, result })

export const flagPostFailed = (err) =>
  ({ type: Types.FLAG_POST_FAILED, err: err })

// Create Post
export const createPostRequested = (data, idToken) =>
  ({ type: Types.CREATE_POST_REQUESTED, data, idToken })

export const createPostSucceeded = (result) =>
  ({ type: Types.CREATE_POST_SUCCEEDED, result })

export const createPostFailed = (err) =>
  ({ type: Types.CREATE_POST_FAILED, err: err })

// Edit Post
export const editPostRequested = (data, idToken) =>
  ({ type: Types.EDIT_POST_REQUESTED, data, idToken })

export const editPostSucceeded = (result) =>
  ({ type: Types.EDIT_POST_SUCCEEDED, result })

export const editPostFailed = (err) =>
  ({ type: Types.EDIT_POST_FAILED, err: err })

// Delete Post
export const deletePostRequested = (data, idToken) =>
  ({ type: Types.DELETE_POST_REQUESTED, data, idToken })

export const deletePostSucceeded = (result) =>
  ({ type: Types.DELETE_POST_SUCCEEDED, result })

export const deletePostFailed = (err) =>
  ({ type: Types.DELETE_POST_FAILED, err: err })
