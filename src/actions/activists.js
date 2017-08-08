import Types from './types';

// Get Activist List
export const activistsFetchRequested = (state, city) =>
  ({ type: Types.ACTIVISTS_FETCH_REQUESTED, state: state, city: city });

export const activistsFetchSucceeded = (activists) =>
  ({ type: Types.ACTIVISTS_FETCH_SUCCEEDED, activists: activists });

export const activistsFetchFailed = (err) =>
  ({ type: Types.ACTIVISTS_FETCH_FAILED, err: err });

// Get Activist
export const activistFetchRequested = (state, city, activist) =>
  ({ type: Types.ACTIVIST_FETCH_REQUESTED, state: state, city: city, activist: activist });

export const activistFetchSucceeded = (activist) =>
  ({ type: Types.ACTIVIST_FETCH_SUCCEEDED, activist: activist });

export const activistFetchFailed = (err) =>
  ({ type: Types.ACTIVIST_FETCH_FAILED, err: err });
