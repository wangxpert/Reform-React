import { put, call, takeLatest } from 'redux-saga/effects';
import Types from '../actions/types';

import * as Actions from '../actions/auth';
import * as Api from '../api/auth';

import { push } from 'react-router-redux';

// Saga: will be fired on SIGNUP_REQUESTED actions
function* requestSignup(action) {
   try {
     // const userName = yield call(Api.requestSignup, action.info);
     yield call(Api.requestSignup, action.info);
     yield put(Actions.signupSucceeded(action.info.userName));
     put(push(`/auth/confirm/${action.info.userName}`));
   } catch (e) {
     alert(e.message); // temporary message. Will remove.
     yield put(Actions.signupFailed(e.message));
   }
}

// Saga: will be fired on CONFIRM_USER_REQUESTED actions
function* requestConfirmUser(action) {
   try {
     const result = yield call(Api.requestConfirmUser, action.userName, action.verificationCode);
     yield put(Actions.confirmUserSucceeded(result));
     yield put('/auth/login');
   } catch (e) {
     alert(e.message); // temporary message. Will remove.
     yield put(Actions.confirmUserFailed(e.message));
   }
}

// Saga: will be fired on RESEND_CODE_REQUESTED actions
function* requestResendCode(action) {
   try {
     const result = yield call(Api.requestResendCode, action.userName);
     yield put(Actions.resendCodeSucceeded(result));
   } catch (e) {
     alert(e.message); // temporary message. Will remove.
     yield put(Actions.resendCodeFailed(e.message));
   }
}


// Saga: will be fired on LOGIN_REQUESTED actions
function* requestLogin(action) {
   try {
     const user = yield call(Api.requestLogin, action.userName, action.password);
     yield put(Actions.loginSucceeded(user));
     yield put(push('/'));
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
    const data = yield call(Api.requestResetPassword, action.userName);
    yield put(Actions.resetPasswordRequestSucceeded(data));
    yield put(push(`/password/confirm/${action.userName}`));
  } catch (e) {
    yield put(Actions.resetPasswordRequestFailed(e.message));
  }
}

// Saga: will be fired on CONFIRM_PASSWORD_REQUESTED actions
function* requestConfirmPassword(action) {
  try {
    const data = yield call(Api.requestConfirmPassword, action.userName, action.verificationCode, action.newPassword);
    yield put(Actions.confirmPasswordSucceeded(data));
    alert('Password is reseted.'); // temporary message. Will remove.
    yield put(push('/auth/login'))
  } catch (e) {
    yield put(Actions.confirmPasswordFailed(e.message));
  }
}

/*
  Does not allow concurrent fetches.
*/
export function* authSaga() {
  yield takeLatest(Types.SIGNUP_REQUESTED, requestSignup);
  yield takeLatest(Types.CONFIRM_USER_REQUESTED, requestConfirmUser);
  yield takeLatest(Types.RESEND_CODE_REQUESTED, requestResendCode);
  yield takeLatest(Types.LOGIN_REQUESTED, requestLogin);
  yield takeLatest(Types.LOGOUT_REQUESTED, requestLogout);
  yield takeLatest(Types.GET_SESSION_REQUESTED, getSession);
  yield takeLatest(Types.RESET_PASSWORD_REQUESTED, requestResetPassword);
  yield takeLatest(Types.CONFIRM_PASSWORD_REQUESTED, requestConfirmPassword);
}
