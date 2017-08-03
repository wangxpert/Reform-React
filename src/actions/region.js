import Types from './types';

export const statesFetchRequested = () =>
  ({ type: Types.STATES_FETCH_REQUESTED });

export const statesFetchSucceeded = (states) =>
  ({ type: Types.STATES_FETCH_SUCCEEDED, states: states });

export const statesFetchFailed = (err) =>
  ({ type: Types.STATES_FETCH_FAILED, err: err });
