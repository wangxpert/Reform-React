import Types from './types'


export const resetPosts = () =>
  ({ type: Types.RESET_POSTS })

export const resetMyPosts = () =>
  ({ type: Types.RESET_MYPOSTS })

// Get Post List
export const postsFetchRequested = (state, city, department, limit = '', lastKey) =>
  ({ type: Types.POSTS_FETCH_REQUESTED, state: state, city: city, department: department, limit: limit, lastKey: lastKey })

export const postsFetchSucceeded = (posts) =>
  ({ type: Types.POSTS_FETCH_SUCCEEDED, posts: posts })

export const postsFetchFailed = (err) =>
  ({ type: Types.POSTS_FETCH_FAILED, err: err })

// Get My Posts
export const getMyPostsRequested = (limit, lastKey, idToken) =>
  ({ type: Types.GET_MYPOSTS_REQUESTED, limit: limit, lastKey: lastKey, idToken })

export const getMyPostsSucceeded = (result) =>
  ({ type: Types.GET_MYPOSTS_SUCCEEDED, result })

export const getMyPostsFailed = (err) =>
  ({ type: Types.GET_MYPOSTS_FAILED, err: err })

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

// Get Post
export const getPostRequested = (state, city, department, post) =>
  ({ type: Types.GET_POST_REQUESTED, state, city, department, post })

export const getPostSucceeded = (result) =>
  ({ type: Types.GET_POST_SUCCEEDED, result })

export const getPostFailed = (err) =>
  ({ type: Types.GET_POST_FAILED, err: err })

// Create Post
export const createPostRequested = (data, idToken) =>
  ({ type: Types.CREATE_POST_REQUESTED, data, idToken })

export const createPostSucceeded = (result) =>
  ({ type: Types.CREATE_POST_SUCCEEDED, result })

export const createPostFailed = (err) =>
  ({ type: Types.CREATE_POST_FAILED, err: err })

// Edit Post
export const updatePostRequested = (data, idToken) =>
  ({ type: Types.UPDATE_POST_REQUESTED, data, idToken })

export const updatePostSucceeded = (result) =>
  ({ type: Types.UPDATE_POST_SUCCEEDED, result })

export const updatePostFailed = (err) =>
  ({ type: Types.UPDATE_POST_FAILED, err: err })

// Delete Post
export const deletePostRequested = (data, idToken) =>
  ({ type: Types.DELETE_POST_REQUESTED, data, idToken })

export const deletePostSucceeded = (result) =>
  ({ type: Types.DELETE_POST_SUCCEEDED, result })

export const deletePostFailed = (err) =>
  ({ type: Types.DELETE_POST_FAILED, err: err })

// Get Post Comments
export const getPostCommentsRequested = (post, limit, lastKey) =>
  ({ type: Types.GET_POST_COMMENTS_REQUESTED, post, limit, lastKey })

export const getPostCommentsSucceeded = (result) =>
  ({ type: Types.GET_POST_COMMENTS_SUCCEEDED, result })

export const getPostCommentsFailed = (err) =>
  ({ type: Types.GET_POST_COMMENTS_FAILED, err: err })

// Add Post Comment
export const addCommentToPostRequested = (post, text, idToken) =>
  ({ type: Types.ADD_COMMENT_TO_POST_REQUESTED, post, text, idToken })

export const addCommentToPostSucceeded = (result) =>
  ({ type: Types.ADD_COMMENT_TO_POST_SUCCEEDED, result })

export const addCommentToPostFailed = (err) =>
  ({ type: Types.ADD_COMMENT_TO_POST_FAILED, err: err })

// Update Post Comment
export const updatePostCommentRequested = (post, commentId, text, idToken) =>
  ({ type: Types.UPDATE_POST_COMMENT_REQUESTED, post, commentId, text, idToken })

export const updatePostCommentSucceeded = (result) =>
  ({ type: Types.UPDATE_POST_COMMENT_SUCCEEDED, result })

export const updatePostCommentFailed = (err) =>
  ({ type: Types.UPDATE_POST_COMMENT_FAILED, err: err })

// Delete Post Comment
export const deletePostCommentRequested = (post, commentId, idToken) =>
  ({ type: Types.DELETE_POST_COMMENT_REQUESTED, post, commentId, idToken })

export const deletePostCommentSucceeded = (result) =>
  ({ type: Types.DELETE_POST_COMMENT_SUCCEEDED, result })

export const deletePostCommentFailed = (err) =>
  ({ type: Types.DELETE_POST_COMMENT_FAILED, err: err })

// Upvote Post Comment
export const upvotePostCommentRequested = (commentLongId, idToken) =>
  ({ type: Types.UPVOTE_POST_COMMENT_REQUESTED, commentLongId, idToken })

export const upvotePostCommentSucceeded = (result) =>
  ({ type: Types.UPVOTE_POST_COMMENT_SUCCEEDED, result })

export const upvotePostCommentFailed = (err) =>
  ({ type: Types.UPVOTE_POST_COMMENT_FAILED, err: err })

// Downvote Post Comment
export const downvotePostCommentRequested = (commentLongId, idToken) =>
  ({ type: Types.DOWNVOTE_POST_COMMENT_REQUESTED, commentLongId, idToken })

export const downvotePostCommentSucceeded = (result) =>
  ({ type: Types.DOWNVOTE_POST_COMMENT_SUCCEEDED, result })

export const downvotePostCommentFailed = (err) =>
  ({ type: Types.DOWNVOTE_POST_COMMENT_FAILED, err: err })

// flag Post Comment
export const flagPostCommentRequested = (commentLongId, idToken) =>
  ({ type: Types.FLAG_POST_COMMENT_REQUESTED, commentLongId, idToken })

export const flagPostCommentSucceeded = (result) =>
  ({ type: Types.FLAG_POST_COMMENT_SUCCEEDED, result })

export const flagPostCommentFailed = (err) =>
  ({ type: Types.FLAG_POST_COMMENT_FAILED, err: err })
