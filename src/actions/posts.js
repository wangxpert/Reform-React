import Types from './types';

// Get Post List
export const resetPosts = () =>
  ({ type: Types.RESET_POSTS })

export const postsFetchRequested = (state, city, department, limit = '', nextKey = '') =>
  ({ type: Types.POSTS_FETCH_REQUESTED, state: state, city: city, department: department, limit: limit, nextKey: nextKey });

export const postsFetchSucceeded = (posts) =>
  ({ type: Types.POSTS_FETCH_SUCCEEDED, posts: posts });

export const postsFetchFailed = (err) =>
  ({ type: Types.POSTS_FETCH_FAILED, err: err });
