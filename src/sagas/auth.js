import { put, call, take, takeLatest } from 'redux-saga/effects'
import Types from '../actions/types'

import * as Actions from '../actions/auth'
import { getUserInformationRequested, resetAccount } from '../actions/account'
import * as Api from '../api/auth'

import { NotificationManager } from 'react-notifications'

import { push } from 'react-router-redux'

// Saga: will be fired on VALIDATE_SIGNUP_INFO_REQUESTED actions
function* requestValidateUserInfo(action) {
   try {
     const result = yield call(Api.validateSignUpInfo, action.info.email, action.info.userName, action.info.phoneNumber, action.info.zipCode)
     yield put(Actions.validateSignUpInfoSucceeded(result))
   } catch (e) {
     NotificationManager.error(e.message, 'Error...')
     yield put(Actions.validateSignUpInfoFailed(e))
   }
}

// Saga: will be fired on SIGNUP_REQUESTED actions


function* requestSignup(action) {
   try {
     yield put(Actions.validateSignUpInfoRequested(action.info))
     const actResult = yield take([Types.VALIDATE_SIGNUP_INFO_SUCCEEDED, Types.VALIDATE_SIGNUP_INFO_FAILED])
     if (actResult.type === Types.VALIDATE_SIGNUP_INFO_SUCCEEDED) {
       const validateResult = Api.handleValidationResult(actResult.result)
       if (validateResult === true) {
         const userName = yield call(Api.requestSignup, action.info)
         yield put(Actions.signupSucceeded(userName))
         yield put(push(`/auth/confirm/${ userName }`))
       }
     }
   } catch (e) {
     NotificationManager.error(e.message, 'Error...')
     yield put(Actions.signupFailed(e))
   }
}

// Saga: will be fired on CONFIRM_USER_REQUESTED actions
function* requestConfirmUser(action) {
   try {
     const result = yield call(Api.requestConfirmUser, action.userName, action.verificationCode)
     yield put(Actions.confirmUserSucceeded(result))
     NotificationManager.success('You account is confirmed. Enjoy.', 'Confirm User')
     yield put('/auth/login')

   } catch (e) {
     NotificationManager.error(e.message, 'Error...')
     yield put(Actions.confirmUserFailed(e))
   }
}

// Saga: will be fired on RESEND_CODE_REQUESTED actions
function* requestResendCode(action) {
   try {
     const result = yield call(Api.requestResendCode, action.userName)
     yield put(Actions.resendCodeSucceeded(result))
   } catch (e) {
     NotificationManager.error(e.message, 'Error...')
     yield put(Actions.resendCodeFailed(e))
   }
}

function confirmUserMessage() {
  return new Promise((resolve, reject) =>
    NotificationManager.error('User is not confirmed. If you want to confirm this user, please click here.', 'Error...', 5000,
      () => resolve('toConfirmUser')
    )
  ).then(response => response,
	   err => {
       throw err
     }
  )
}

// Saga: will be fired on LOGIN_REQUESTED actions
function* requestLogin(action) {
   try {
     const session = yield call(Api.requestLogin, action.userName, action.password)
     yield put(Actions.loginSucceeded(session))
     NotificationManager.success(`Welcome ${ action.userName }`, 'Welcome')
     yield put(getUserInformationRequested())
     yield put(push('/'))
   } catch (e) {
     yield put(Actions.loginFailed(e))

     if (e.code === 'UserNotConfirmedException') {
       yield call(confirmUserMessage)
       yield put(push(`/auth/confirm/${ action.userName }`))
     } else {
       NotificationManager.error(e.message, 'Error...')
     }
   }
}

// Saga: will be fired on LOGOUT_REQUESTED actions
function* requestLogout(action) {
  try {
    yield call(Api.requestLogout)
    yield put(Actions.logoutSucceeded())
    yield put(resetAccount())
  } catch (e) {
    NotificationManager.error(e.message, 'Error...')
  }
}

// Saga: will be fired on GET_SESSION_REQUESTED actions
function* getSession(action) {
  try {
    const session = yield call(Api.getSession)
    yield put(Actions.getSessionSucceeded(session))
  } catch (e) {
    yield put(Actions.getSessionFailed(e))
  }
}

// Saga: will be fired on RESET_PASSWORD_REQUESTED actions
function* requestResetPassword(action) {
  try {
    const data = yield call(Api.requestResetPassword, action.userName)
    yield put(Actions.resetPasswordRequestSucceeded(data))
    yield put(push(`/password/confirm/${ action.userName }`))
  } catch (e) {
    NotificationManager.error(e.message, 'Error...')
    yield put(Actions.resetPasswordRequestFailed(e))
  }
}

// Saga: will be fired on CONFIRM_PASSWORD_REQUESTED actions
function* requestConfirmPassword(action) {
  try {
    const data = yield call(Api.requestConfirmPassword, action.userName, action.verificationCode, action.newPassword)
    yield put(Actions.confirmPasswordSucceeded(data))
    NotificationManager.success('You can use the new password from now.', 'Reset Password')
    yield put(push('/auth/login'))
  } catch (e) {
    NotificationManager.error(e.message, 'Error...')
    yield put(Actions.confirmPasswordFailed(e))
  }
}

/*
  Does not allow concurrent fetches.
*/
export function* authSaga() {
  yield takeLatest(Types.VALIDATE_SIGNUP_INFO_REQUESTED, requestValidateUserInfo)
  yield takeLatest(Types.SIGNUP_REQUESTED, requestSignup)
  yield takeLatest(Types.CONFIRM_USER_REQUESTED, requestConfirmUser)
  yield takeLatest(Types.RESEND_CODE_REQUESTED, requestResendCode)
  yield takeLatest(Types.LOGIN_REQUESTED, requestLogin)
  yield takeLatest(Types.LOGOUT_REQUESTED, requestLogout)
  yield takeLatest(Types.GET_SESSION_REQUESTED, getSession)
  yield takeLatest(Types.RESET_PASSWORD_REQUESTED, requestResetPassword)
  yield takeLatest(Types.CONFIRM_PASSWORD_REQUESTED, requestConfirmPassword)
}
