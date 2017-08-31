import { put, call, takeLatest } from 'redux-saga/effects'
import Types from '../actions/types'

import { uploadFile, deleteFile } from '../api/assets'
import * as Api from '../api/manage_activism'

import * as Actions from '../actions/manage_activism'

import { AWS_S3_ACTIVISM_FOLDER, AWS_S3_BUCKET_NAME, AWS_S3 } from '../config'

import { NotificationManager } from 'react-notifications'

// Saga: will be fired on CREATE_ACTIVISM_PAGE_REQUESTED actions
function* createActivismPage(action) {
  try {
    let info = action.info
    if (info.videoFile) {
      let video = yield call(uploadFile, AWS_S3_ACTIVISM_FOLDER, info.videoFile)
      info.video = `${ AWS_S3 }/${ AWS_S3_BUCKET_NAME }/${ video.key }`
    }

    info.images = []
    if (info.imageFiles) {
      for (let i = 0; i < info.imageFiles.length; i++) {
        let image = yield call(uploadFile, AWS_S3_ACTIVISM_FOLDER, info.imageFiles[i])
        info.images.push(`${ AWS_S3 }/${ AWS_S3_BUCKET_NAME }/${ image.key }`)
      }
    }

    var result = yield call(Api.createActivismPage, info, action.idToken)

    yield put(Actions.createActivismPageSucceeded(result))

    NotificationManager.success('New Activism Page is created.', 'Create Activism Page')
  } catch (e) {
    yield put(Actions.createActivismPageFailed(e))
    NotificationManager.error(e.errorMessage, 'Error...')
  }
}

/*
  Does not allow concurrent fetches.
*/
export function* manageActivismSaga() {
  yield takeLatest(Types.CREATE_ACTIVISM_PAGE_REQUESTED, createActivismPage)
}
