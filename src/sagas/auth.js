import { put, call, takeLatest } from 'redux-saga/effects';
import Types from '../actions/types';

import * as Actions from '../actions/auth';
import * as Api from '../api/auth';

// worker Saga: will be fired on LOGIN_REQUESTED actions
function* requestLogin(action) {
   try {
     const user = yield call(Api.requestLogin, action.email, action.password);
     localStorage.setItem('user', user);
     yield put(Actions.loginSucceeded(user));
   } catch (e) {
     localStorage.setItem('err', e);
     yield put(Actions.loginFailed(e.message));
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* authSaga() {
  yield takeLatest(Types.LOGIN_REQUESTED, requestLogin);
}
