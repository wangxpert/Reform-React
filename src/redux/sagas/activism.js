import { put, call, takeLatest } from 'redux-saga/effects'

import Types from '../actions/types'
import * as Actions  from '../actions/activism'

import * as Api from '../../api/activism'
import { uploadFile, deleteFile } from '../../api/assets'

import { AWS_S3_ACTIVISM_FOLDER, AWS_S3_BUCKET_NAME, AWS_S3 } from '../../config'

import { NotificationManager } from 'react-notifications'

import { errorMessage } from '../../utils/error'

import { goBack } from 'react-router-redux'


// Saga: will be fired on ACTIVISTS_FETCH_REQUESTED actions
function* fetchActivists(action) {
   try {
      const activists = yield call(Api.fetchActivists, action.state, action.city, action.includingStates, action.includingCities, action.limit, action.lastKey)
      yield put({ type: "ACTIVISTS_FETCH_SUCCEEDED", activists: activists })
   } catch (e) {
      yield put({ type: "ACTIVISTS_FETCH_FAILED", err: e.message })
   }
}

// Saga: will be fired on GET_MYPAGES_REQUESTED actions
function* getMyPages(action) {
   try {
      const result = yield call(Api.getMyPages, action.limit, action.lastKey, action.idToken)
      yield put(Actions.getMyPagesSucceeded(result))
   } catch (e) {
      yield put(Actions.getMyPagesFailed(e))
   }
}

// Saga: will be fired on GET_ACTIVISM_PAGE_REQUESTED actions
function* getActivismPage(action) {
   try {
      const page = yield call(Api.getActivismPage, action.pageId)
      yield put(Actions.getActivismPageSucceeded(page))
   } catch (e) {
      yield put(Actions.getActivismPageFailed(e.message))
   }
}

// Saga: will be fired on CREATE_ACTIVISM_PAGE_REQUESTED actions
function* createActivismPage(action) {
  try {
    let data = action.data
    if (data.videoFile) {
      let video = yield call(uploadFile, AWS_S3_ACTIVISM_FOLDER, data.videoFile)
      data.video = `${ AWS_S3 }/${ AWS_S3_BUCKET_NAME }/${ video.key }`
    }

    data.images = []
    if (data.imageFiles) {
      for (let i = 0; i < data.imageFiles.length; i++) {
        let image = yield call(uploadFile, AWS_S3_ACTIVISM_FOLDER, data.imageFiles[i])
        data.images.push(`${ AWS_S3 }/${ AWS_S3_BUCKET_NAME }/${ image.key }`)
      }
    }

    var result = yield call(Api.createActivismPage, data, action.idToken)

    yield put(Actions.createActivismPageSucceeded(result))

    NotificationManager.success('New Activism Page is created.', 'Create Activism Page')
  } catch (e) {
    yield put(Actions.createActivismPageFailed(e))
    NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
  }
}

// Saga: will be fired on UPDATE_ACTIVISM_PAGE_REQUESTED actions
function* updateActivismPage(action) {
  try {
    let data = action.data

    if (data.videoFile) {
      let video = yield call(uploadFile, AWS_S3_ACTIVISM_FOLDER, data.videoFile)
      data.video = `${ AWS_S3 }/${ AWS_S3_BUCKET_NAME }/${ video.key }`

      if (data.oldVideo) {
        let path = data.oldVideo.split('/')
        deleteFile(AWS_S3_ACTIVISM_FOLDER, path[path.length - 1])
      }
    }

    data.images = []
    if (data.imageFiles) {
      for (let i = 0; i < data.imageFiles.length; i++) {
        let file = data.imageFiles[i]
        if (typeof file === 'string') {
          data.images.push(file)
          data.oldImages.splice(data.oldImages.indexOf(file), 1)
        } else {
          let image = yield call(uploadFile, AWS_S3_ACTIVISM_FOLDER, data.imageFiles[i])
          data.images.push(`${ AWS_S3 }/${ AWS_S3_BUCKET_NAME }/${ image.key }`)
        }
      }
    }

    for (let i = 0; i < data.oldImages.length; i++) {
      let path = data.oldImages[i].split('/')
      deleteFile(AWS_S3_ACTIVISM_FOLDER, path[path.length - 1])
    }

    console.log(data)
    var result = yield call(Api.updateActivismPage, action.pageId, data, action.idToken)

    yield put(Actions.updateActivismPageSucceeded(result))

    NotificationManager.success('Successfully Saved !', 'Edit Activism Page')
  } catch (e) {
    yield put(Actions.updateActivismPageFailed(e))
    NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
  }
}

// Saga: will be fired on DELETE_ACTIVISM_PAGE_REQUESTED actions
function* deletePage(action) {
   try {
      const result = yield call(Api.deleteActivismPage, action.pageId, action.idToken)
      yield put(Actions.deleteActivismPageSucceeded(result))
      yield put(goBack())
      NotificationManager.success('The page is deleted.', 'Delete Activism Page')
   } catch (e) {
      yield put(Actions.deleteActivismPageFailed(e))
      NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on ADD_USER_EMAIL_TO_ACTIVISM_PAGE_REQUESTED actions
function* addUserEmailToActivismPage(action) {
   try {
      const result = yield call(Api.addUserEmailToActivismPage, action.pageId, action.email)
      yield put(Actions.addUserEmailToActivismPageSucceeded(result))
      NotificationManager.success('Thanks for adding your email to this activism page', 'Add Email')
   } catch (e) {
      yield put(Actions.addUserEmailToActivismPageFailed(e))
      NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on UPVOTE_ACTIVISM_PAGE actions
function* upvoteActivismPage(action) {
   try {
      const result = yield call(Api.upvoteActivismPage, action.pageId, action.idToken)
      yield put(Actions.upvoteActivismPageSucceeded(result))
   } catch (e) {
      yield put(Actions.upvoteActivismPageFailed(e))
      NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on DOWNVOTE_ACTIVISM_PAGE actions
function* downvoteActivismPage(action) {
   try {
      const result = yield call(Api.downvoteActivismPage, action.pageId, action.idToken)
      yield put(Actions.downvoteActivismPageSucceeded(result))
   } catch (e) {
      yield put(Actions.downvoteActivismPageFailed(e))
      NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on FLAG_ACTIVISM_PAGE actions
function* flagActivismPage(action) {
   try {
      const result = yield call(Api.flagActivismPage, action.pageId, action.idToken)
      yield put(Actions.flagActivismPageSucceeded(result))
   } catch (e) {
      yield put(Actions.flagActivismPageFailed(e))
      NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on FOLLOW_ACTIVISM_PAGE actions
function* followActivismPage(action) {
   try {
      const result = yield call(Api.followActivismPage, action.pageId, action.idToken)
      yield put(Actions.followActivismPageSucceeded(result))
   } catch (e) {
      yield put(Actions.followActivismPageFailed(e))
      NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on GET_ACTIVISM_PAGE_COMMENTS_REQUESTED actions
function* getActivismPageComments(action) {
   try {
      const result = yield call(Api.getActivismPageComments, action.pageId, action.email)
      yield put(Actions.getActivismPageCommentsSucceeded(result))
   } catch (e) {
      yield put(Actions.getActivismPageCommentsFailed(e))
      // NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on ADD_COMMENT_TO_ACTIVISM_PAGE_REQUESTED actions
function* addCommentToActivismPage(action) {
   try {
      const result = yield call(Api.addCommentToActivismPage, action.pageId, action.text, action.idToken)
      yield put(Actions.addCommentToActivismPageSucceeded(result))
      NotificationManager.success('New comment is added successfully.', 'Add comment')
   } catch (e) {
      yield put(Actions.addCommentToActivismPageFailed(e))
      NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on UPDATE_COMMENT actions
function* updateComment(action) {
   try {
      const result = yield call(Api.updateComment, action.pageId, action.commentId, action.text, action.idToken)
      yield put(Actions.updateCommentSucceeded(result))
      NotificationManager.success('The change is saved successfully.', 'Edit comment')
   } catch (e) {
      yield put(Actions.updateCommentFailed(e))
      NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on DELETE_COMMENT actions
function* deleteComment(action) {
   try {
      const result = yield call(Api.deleteComment, action.pageId, action.commentId, action.idToken)
      yield put(Actions.deleteCommentSucceeded(result))
      NotificationManager.success('The comment is deleted successfully.', 'Delete comment')
   } catch (e) {
      yield put(Actions.deleteCommentFailed(e))
      NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on UPVOTE_COMMENT actions
function* upvoteComment(action) {
   try {
      const result = yield call(Api.upvoteComment, action.pageId, action.commentId, action.idToken)
      yield put(Actions.upvoteCommentSucceeded(result))
   } catch (e) {
      yield put(Actions.upvoteCommentFailed(e))
      NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on DOWNVOTE_COMMENT actions
function* downvoteComment(action) {
   try {
      const result = yield call(Api.downvoteComment, action.pageId, action.commentId, action.idToken)
      yield put(Actions.downvoteCommentSucceeded(result))
   } catch (e) {
      yield put(Actions.downvoteCommentFailed(e))
      NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on FLAG_COMMENT actions
function* flagComment(action) {
   try {
      const result = yield call(Api.flagComment, action.pageId, action.commentId, action.idToken)
      yield put(Actions.flagCommentSucceeded(result))
   } catch (e) {
      yield put(Actions.flagCommentFailed(e))
      NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* activismSaga() {
  yield takeLatest(Types.ACTIVISTS_FETCH_REQUESTED, fetchActivists)
  yield takeLatest(Types.GET_MYPAGES_REQUESTED, getMyPages)
  yield takeLatest(Types.GET_ACTIVISM_PAGE_REQUESTED, getActivismPage)
  yield takeLatest(Types.CREATE_ACTIVISM_PAGE_REQUESTED, createActivismPage)
  yield takeLatest(Types.UPDATE_ACTIVISM_PAGE_REQUESTED, updateActivismPage)
  yield takeLatest(Types.DELETE_ACTIVISM_PAGE_REQUESTED, deletePage)
  yield takeLatest(Types.ADD_USER_EMAIL_TO_ACTIVISM_PAGE_REQUESTED, addUserEmailToActivismPage)
  yield takeLatest(Types.GET_ACTIVISM_PAGE_COMMENTS_REQUESTED, getActivismPageComments)
  yield takeLatest(Types.UPVOTE_ACTIVISM_PAGE_REQUESTED, upvoteActivismPage)
  yield takeLatest(Types.DOWNVOTE_ACTIVISM_PAGE_REQUESTED, downvoteActivismPage)
  yield takeLatest(Types.ADD_COMMENT_TO_ACTIVISM_PAGE_REQUESTED, addCommentToActivismPage)
  yield takeLatest(Types.UPDATE_COMMENT_REQUESTED, updateComment)
  yield takeLatest(Types.DELETE_COMMENT_REQUESTED, deleteComment)
  yield takeLatest(Types.FLAG_ACTIVISM_PAGE_REQUESTED, flagActivismPage)
  yield takeLatest(Types.FOLLOW_ACTIVISM_PAGE_REQUESTED, followActivismPage)
  yield takeLatest(Types.UPVOTE_COMMENT_REQUESTED, upvoteComment)
  yield takeLatest(Types.DOWNVOTE_COMMENT_REQUESTED, downvoteComment)
  yield takeLatest(Types.FLAG_COMMENT_REQUESTED, flagComment)
}
