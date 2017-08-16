import { put, call, takeLatest } from 'redux-saga/effects';
import Types from '../actions/types';

import * as Actions from '../actions/auth';
import * as Api from '../api/auth';

// Saga: will be fired on LOGIN_REQUESTED actions
function* requestLogin(action) {
   try {
     const user = yield call(Api.requestLogin, action.email, action.password);
     yield put(Actions.loginSucceeded(user));
   } catch (e) {
     alert(e.message); // temporary message. Will remove.
     yield put(Actions.loginFailed(e.message));
   }
}

// Saga: will be fired on LOGOUT_REQUESTED actions
function* requestLogout(action) {
  try {
    yield call(Api.requestLogout);
    yield put(Actions.logoutSucceeded());
  } catch (e) {
    console.log(e.message);
  }
}

// Saga: will be fired on GET_SESSION_REQUESTED actions
function* getSession(action) {
  try {
    const user = yield call(Api.getSession);
    yield put(Actions.getSessionSucceeded(user));
  } catch (e) {
    yield put(Actions.getSessionFailed(e.message));
  }
}

// Saga: will be fired on RESET_PASSWORD_REQUESTED actions
function* requestResetPassword(action) {
  try {
    const data = yield call(Api.requestResetPassword);
    yield put(Actions.resetPasswordRequestSucceeded(data));
  } catch (e) {
    yield put(Actions.resetPasswordRequestFailed(e.message));
  }
}

// Saga: will be fired on CONFIRM_PASSWORD_REQUESTED actions
function* requestConfirmPassword(action) {
  try {
    const data = yield call(Api.requestConfirmPassword, action.verificationCode, action.newPassword);
    yield put(Actions.confirmPasswordSucceeded(data));
  } catch (e) {
    yield put(Actions.confirmPasswordFailed(e.message));
  }
}

/*
  Does not allow concurrent fetches.
*/
export function* authSaga() {
  yield takeLatest(Types.LOGIN_REQUESTED, requestLogin);
  yield takeLatest(Types.LOGOUT_REQUESTED, requestLogout);
  yield takeLatest(Types.GET_SESSION_REQUESTED, getSession);
  yield takeLatest(Types.RESET_PASSWORD_REQUESTED, requestResetPassword);
  yield takeLatest(Types.CONFIRM_PASSWORD_REQUESTED, requestConfirmPassword);
}
