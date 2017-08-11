import Types from './types';

// Get Activist List
export const resetActivists = () =>
  ({ type: Types.RESET_ACTIVISTS })

export const activistsFetchRequested = (state, city, limit = '', lastKey) =>
  ({ type: Types.ACTIVISTS_FETCH_REQUESTED, state: state, city: city, limit: limit, lastKey: lastKey });

export const activistsFetchSucceeded = (activists) =>
  ({ type: Types.ACTIVISTS_FETCH_SUCCEEDED, activists: activists });

export const activistsFetchFailed = (err) =>
  ({ type: Types.ACTIVISTS_FETCH_FAILED, err: err });
