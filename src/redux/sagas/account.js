import { put, call, takeLatest } from 'redux-saga/effects'
import Types from '../actions/types'
import * as Api from '../../api/account'
import { validateSignUpInfo, handleValidationResult } from '../../api/auth'

import * as Actions from '../actions/account'

import { AWS_S3_BUCKET_NAME, AWS_S3 } from '../../config'

import { NotificationManager } from 'react-notifications'

// Saga: will be fired on GET_USER_INFORMATION_REQUESTED actions
function* getUserInformation(action) {
   try {
     const result = yield call(Api.getUserInformation)
     yield put(Actions.getUserInformationSucceeded(result))
   } catch (e) {
     yield put(Actions.getUserInformationFailed(e))
   }
}

// Saga: will be fired on UPLOAD_AVATAR_REQUESTED actions
function* uploadAvatar(action) {
   try {
     const result = yield call(Api.uploadAvatar, action.file)
     yield put(Actions.uploadAvatarSucceeded(result))
   } catch (e) {
     yield put(Actions.uploadAvatarFailed(e))
   }
}

// Saga: will be fired on UPLOAD_AVATAR_REQUESTED actions
function* updateUserInformation(action) {
  try {
    let info = action.info
    if (info.avatarFile) {
      if (info.oldAvatar) {
        const path = info.oldAvatar.split('/')
        yield call(Api.deleteAvatar, path[path.length - 1])
      }
      let avatar = yield call(Api.uploadAvatar, info.avatarFile)
      info.avatar = `${ AWS_S3 }/${ AWS_S3_BUCKET_NAME }/${ avatar.key }`
    }

    const validateResult = yield call(validateSignUpInfo, action.info.email, action.info.userName, action.info.phoneNumber, action.info.zipCode)

    handleValidationResult(validateResult)

    var result = yield call(Api.updateUserInformation, info)

    if (info.oldPassword) {
      result = yield call(Api.changePassword, info.oldPassword, info.newPassword)
    }

    yield put(Actions.updateUserInformationSucceeded(result))
    yield put(Actions.getUserInformationRequested())
    NotificationManager.success('Your information is changed.', 'Update User Information')
  } catch (e) {
    NotificationManager.error(e.message, 'Error...')
    yield put(Actions.updateUserInformationFailed(e))
  }
}


/*
  Does not allow concurrent fetches.
*/
export function* accountSaga() {
  yield takeLatest(Types.GET_USER_INFORMATION_REQUESTED, getUserInformation)
  yield takeLatest(Types.UPLOAD_AVATAR_REQUESTED, uploadAvatar)
  yield takeLatest(Types.UPDATE_USER_INFORMATION_REQUESTED, updateUserInformation)
}
