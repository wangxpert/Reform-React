import { put, call, takeLatest } from 'redux-saga/effects'
import Types from '../actions/types'
import * as Api from '../api/activists'

// worker Saga: will be fired on ACTIVISTS_FETCH_REQUESTED actions
function* fetchActivists(action) {
   try {
      const activists = yield call(Api.fetchActivists, action.state, action.city, action.limit, action.lastKey)
      yield put({ type: "ACTIVISTS_FETCH_SUCCEEDED", activists: activists })
   } catch (e) {
      yield put({ type: "ACTIVISTS_FETCH_FAILED", err: e.message })
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* activistsSaga() {
  yield takeLatest(Types.ACTIVISTS_FETCH_REQUESTED, fetchActivists)
}
