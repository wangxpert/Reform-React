import Types from './types'


export const resetActivists = () =>
  ({ type: Types.RESET_ACTIVISTS })

// Get Activist List
export const activistsFetchRequested = (state, city, includingStates, includingCities, limit = '', lastKey) =>
  ({ type: Types.ACTIVISTS_FETCH_REQUESTED, state, city, includingStates, includingCities, limit, lastKey })

export const activistsFetchSucceeded = (activists) =>
  ({ type: Types.ACTIVISTS_FETCH_SUCCEEDED, activists: activists })

export const activistsFetchFailed = (err) =>
  ({ type: Types.ACTIVISTS_FETCH_FAILED, err: err })

// Get Activism Page
export const getActivismPageRequested = (pageId) =>
  ({ type: Types.GET_ACTIVISM_PAGE_REQUESTED, pageId })

export const getActivismPageSucceeded = (result) =>
  ({ type: Types.GET_ACTIVISM_PAGE_SUCCEEDED, result })

export const getActivismPageFailed = (err) =>
  ({ type: Types.GET_ACTIVISM_PAGE_FAILED, err })

// Create Activism Page
export const createActivismPageRequested = (data, idToken) =>
  ({ type: Types.CREATE_ACTIVISM_PAGE_REQUESTED, data, idToken })

export const createActivismPageSucceeded = (result) =>
  ({ type: Types.CREATE_ACTIVISM_PAGE_SUCCEEDED, result })

export const createActivismPageFailed = (err) =>
  ({ type: Types.CREATE_ACTIVISM_PAGE_FAILED, err })

// Update Activism Page
export const updateActivismPageRequested = (data, idToken) =>
  ({ type: Types.UPDATE_ACTIVISM_PAGE_REQUESTED, data, idToken })

export const updateActivismPageSucceeded = (result) =>
  ({ type: Types.UPDATE_ACTIVISM_PAGE_SUCCEEDED, result })

export const updateActivismPageFailed = (err) =>
  ({ type: Types.UPDATE_ACTIVISM_PAGE_FAILED, err })

// Add User Email to Activism Page
export const addUserEmailToActivismPageRequested = (pageId, email) =>
  ({ type: Types.ADD_USER_EMAIL_TO_ACTIVISM_PAGE_REQUESTED, pageId, email })

export const addUserEmailToActivismPageSucceeded = (result) =>
  ({ type: Types.ADD_USER_EMAIL_TO_ACTIVISM_PAGE_SUCCEEDED, result })

export const addUserEmailToActivismPageFailed = (err) =>
  ({ type: Types.ADD_USER_EMAIL_TO_ACTIVISM_PAGE_FAILED, err })

// Get comments of Activism Page
export const getActivismPageCommentsRequested = (pageId, limit = '', lastKey) =>
  ({ type: Types.GET_ACTIVISM_PAGE_COMMENTS_REQUESTED, pageId, limit, lastKey })

export const getActivismpageCommentsSucceeded = (result) =>
  ({ type: Types.GET_ACTIVISM_PAGE_COMMENTS_SUCCEEDED, result })

export const getActivismPageCommentsFailed = (err) =>
  ({ type: Types.GET_ACTIVISM_PAGE_COMMENTS_FAILED, err })

// Upvote Activism Page
export const upvoteActivismPageRequested = (pageId, idToken) =>
  ({ type: Types.UPVOTE_ACTIVISM_PAGE_REQUESTED, pageId, idToken })

export const upvoteActivismPageSucceeded = (result) =>
  ({ type: Types.UPVOTE_ACTIVISM_PAGE_SUCCEEDED, result })

export const upvoteActivismPageFailed = (err) =>
  ({ type: Types.UPVOTE_ACTIVISM_PAGE_FAILED, err })

// Downvote Activism Page
export const downvoteActivismPageRequested = (pageId, idToken) =>
  ({ type: Types.DOWNVOTE_ACTIVISM_PAGE_REQUESTED, pageId, idToken })

export const downvoteActivismPageSucceeded = (result) =>
  ({ type: Types.DOWNVOTE_ACTIVISM_PAGE_SUCCEEDED, result })

export const downvoteActivismPageFailed = (err) =>
  ({ type: Types.DOWNVOTE_ACTIVISM_PAGE_FAILED, err })

// Flag Activism Page
export const flagActivismPageRequested = (pageId, idToken) =>
  ({ type: Types.FLAG_ACTIVISM_PAGE_REQUESTED, pageId, idToken })

export const flagActivismPageSucceeded = (result) =>
  ({ type: Types.FLAG_ACTIVISM_PAGE_SUCCEEDED, result })

export const flagActivismPageFailed = (err) =>
  ({ type: Types.FLAG_ACTIVISM_PAGE_FAILED, err })

// Follow Activism Page
export const followActivismPageRequested = (pageId, idToken) =>
  ({ type: Types.FOLLOW_ACTIVISM_PAGE_REQUESTED, pageId, idToken })

export const followActivismPageSucceeded = (result) =>
  ({ type: Types.FOLLOW_ACTIVISM_PAGE_SUCCEEDED, result })

export const followActivismPageFailed = (err) =>
  ({ type: Types.FOLLOW_ACTIVISM_PAGE_FAILED, err })

// Add Comment to Activism Page
export const addCommentToActivismPageRequested = (pageId, content, idToken) =>
  ({ type: Types.ADD_COMMENT_TO_ACTIVISM_PAGE_REQUESTED, pageId, content, idToken })

export const addCommentToActivismPageSucceeded = (result) =>
  ({ type: Types.ADD_COMMENT_TO_ACTIVISM_PAGE_SUCCEEDED, result })

export const addCommentToActivismPageFailed = (err) =>
  ({ type: Types.ADD_COMMENT_TO_ACTIVISM_PAGE_FAILED, err })

// Upvote Comment
export const upvoteCommentRequested = (pageId, commentId, idToken) =>
  ({ type: Types.UPVOTE_COMMENT_REQUESTED, pageId, commentId, idToken })

export const upvoteCommentSucceeded = (result) =>
  ({ type: Types.UPVOTE_COMMENT_SUCCEEDED, result })

export const upvoteCommentFailed = (err) =>
  ({ type: Types.UPVOTE_COMMENT_FAILED, err })

// Downvote Comment
export const downvoteCommentRequested = (pageId, commentId, idToken) =>
  ({ type: Types.DOWNVOTE_COMMENT_REQUESTED, pageId, commentId, idToken })

export const downvoteCommentSucceeded = (result) =>
  ({ type: Types.DOWNVOTE_COMMENT_SUCCEEDED, result })

export const downvoteCommentFailed = (err) =>
  ({ type: Types.DOWNVOTE_COMMENT_FAILED, err })

// Flag Comment
export const flagCommentRequested = (pageId, commentId, idToken) =>
  ({ type: Types.FLAG_COMMENT_REQUESTED, pageId, commentId, idToken })

export const flagCommentSucceeded = (result) =>
  ({ type: Types.FLAG_COMMENT_SUCCEEDED, result })

export const flagCommentFailed = (err) =>
  ({ type: Types.FLAG_COMMENT_FAILED, err })
