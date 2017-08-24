import { put, call, takeLatest } from 'redux-saga/effects'
import Types from '../actions/types'
import * as Api from '../api/account'

import * as Actions from '../actions/account'

// Saga: will be fired on GET_USER_INFORMATION_REQUESTED actions
function* getUserInformation(action) {
   try {
      const result = yield call(Api.requestUserInformation)
      yield put(Actions.getUserInformationSucceeded(result))
   } catch (e) {
      yield put(Actions.getUserInformationFailed(e))
   }
}

// Saga: will be fired on UPLOAD_AVATAR_REQUESTED actions
function* uploadAvatar(action) {
   try {
      const result = yield call(Api.uploadAvatar, action.file)
      yield put(Actions.uploadAvatarSucceeded())
   } catch (e) {
      yield put(Actions.uploadAvatarFailed(e))
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* accountSaga() {
  yield takeLatest(Types.GET_USER_INFORMATION_REQUESTED, getUserInformation)
  yield takeLatest(Types.UPLOAD_AVATAR_REQUESTED, uploadAvatar)
}
