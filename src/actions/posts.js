import Types from './types';

// Get Post List
export const postsFetchRequested = (state, city, department) =>
  ({ type: Types.POSTS_FETCH_REQUESTED, state: state, city: city, department: department });

export const postsFetchSucceeded = (posts) =>
  ({ type: Types.POSTS_FETCH_SUCCEEDED, posts: posts });

export const postsFetchFailed = (err) =>
  ({ type: Types.POSTS_FETCH_FAILED, err: err });
