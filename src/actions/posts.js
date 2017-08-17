import Types from './types';

// Get Post List
export const resetPosts = () =>
  ({ type: Types.RESET_POSTS })

export const postsFetchRequested = (state, city, department, limit = '', lastKey) =>
  ({ type: Types.POSTS_FETCH_REQUESTED, state: state, city: city, department: department, limit: limit, lastKey: lastKey });

export const postsFetchSucceeded = (posts) =>
  ({ type: Types.POSTS_FETCH_SUCCEEDED, posts: posts });

export const postsFetchFailed = (err) =>
  ({ type: Types.POSTS_FETCH_FAILED, err: err });


export const upvotePostRequested = (state, city, department, post, idToken) =>
  ({ type: Types.UPVOTE_POST_REQUESTED, state, city, department, post, idToken });

export const upvotePostSucceeded = (state, city, department, post) =>
  ({ type: Types.UPVOTE_POST_SUCCEEDED, state, city, department, post });

export const upvotePostFailed = (err) =>
  ({ type: Types.UPVOTE_POST_FAILED, err: err });
