import { put, call, takeLatest } from 'redux-saga/effects';
import Types from '../actions/types';
import * as Api from '../api/activists';

// worker Saga: will be fired on POSTS_FETCH_REQUESTED actions
function* fetchActivists(action) {
   try {
      const activists = yield call(Api.fetchActivists, action.state, action.city);
      yield put({ type: "ACTIVISTS_FETCH_SUCCEEDED", activists: activists });
   } catch (e) {
      yield put({ type: "ACTIVISTS_FETCH_FAILED", err: e.message });
   }
}

function* fetchActivist(action) {
   try {
      const activist = yield call(Api.fetchActivist, action.state, action.city, action.activist);
      yield put({ type: "ACTIVIST_FETCH_SUCCEEDED", activist: activist });
   } catch (e) {
      yield put({ type: "ACTIVIST_FETCH_FAILED", err: e.message });
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* activistsSaga() {
  yield takeLatest(Types.ACTIVISTS_FETCH_REQUESTED, fetchActivists);
  yield takeLatest(Types.ACTIVIST_FETCH_REQUESTED, fetchActivist);
}
