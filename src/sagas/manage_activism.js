import { put, call, takeEvery, takeLatest } from 'redux-saga/effects'
import Types from '../actions/types'
import { uploadFile, deleteFile } from '../api/assets'
import * as Api from '../api/manage_activism'

import * as Actions from '../actions/manage_activism'

import { AWS_S3_ACTIVISM_FOLDER, AWS_S3_BUCKET_NAME, AWS_S3 } from '../config'

import { NotificationManager } from 'react-notifications'

// worker Saga: will be fired on UPLOAD_IMAGE_REQUESTED actions
function* uploadImage(action) {
  try {
    const result = yield call(uploadFile, AWS_S3_ACTIVISM_FOLDER, action.file)
    const path = result.Location.replace('https://', '')
    yield put(Actions.uploadImageSucceeded(path))
  } catch (e) {
    yield put(Actions.uploadImageFailed(action.file, e.message))
  }
}

function* deleteImage(action) {
  try {
    const path = action.file.split('/')
    yield call(deleteFile, AWS_S3_ACTIVISM_FOLDER, path[path.length - 1])
    yield put(Actions.deleteImageSucceeded(action.file))
  } catch (e) {
    yield put(Actions.deleteImageFailed(e.error))
  }
}

// Saga: will be fired on CREATE_ACTIVISM_PAGE_REQUESTED actions
function* createActivismPage(action) {
  try {
    let info = action.info
    if (info.videoFile) {
      let avatar = yield call(uploadFile, AWS_S3_ACTIVISM_FOLDER, info.videoFile)
      info.video = `${ AWS_S3 }/${ AWS_S3_BUCKET_NAME }/${ avatar.key }`
    }

    var result = yield call(Api.createActivismPage, info, action.idToken)

    yield put(Actions.createActivismPageSucceeded(result))

    NotificationManager.success('New Activism Page is created.', 'Create Activism Page')
  } catch (e) {
    yield put(Actions.createActivismPageFailed(e.errorMessage))
    NotificationManager.error(e.errorMessage, 'Error...')
  }
}

/*
  Does not allow concurrent fetches.
*/
export function* manageActivismSaga() {
  yield takeEvery(Types.UPLOAD_IMAGE_REQUESTED, uploadImage)
  yield takeEvery(Types.DELETE_IMAGE_REQUESTED, deleteImage)
  yield takeLatest(Types.CREATE_ACTIVISM_PAGE_REQUESTED, createActivismPage)
}
