import { put, call, takeLatest } from 'redux-saga/effects';
import Types from '../actions/types';
import * as Api from '../api/region';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchStates(action) {
   try {
      const states = yield call(Api.fetchStates);
      yield put({type: "STATES_FETCH_SUCCEEDED", states: states});
   } catch (e) {
      yield put({type: "STATES_FETCH_FAILED", err: e.message});
   }
}

/*
  Does not allow concurrent fetches.
*/

export function* regionSaga() {
  yield takeLatest(Types.STATES_FETCH_REQUESTED, fetchStates);
}
