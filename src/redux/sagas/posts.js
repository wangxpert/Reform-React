import { put, call, takeLatest } from 'redux-saga/effects'
import Types from '../actions/types'
import * as Api from '../../api/posts'
import * as Actions from '../actions/posts'

import { uploadFile, deleteFile } from '../../api/assets'

import { NotificationManager } from 'react-notifications'

// Import utils
import { errorMessage } from '../../utils/error'

// Import configs
import { AWS_S3_POST_FOLDER, AWS_S3_BUCKET_NAME, AWS_S3 } from '../../config'

// Saga: will be fired on POSTS_FETCH_REQUESTED actions
function* fetchPosts(action) {
   try {
     const posts = yield call(Api.fetchPosts, action.state, action.city, action.department, action.limit, action.lastKey)
     yield put({ type: "POSTS_FETCH_SUCCEEDED", posts: posts })
   } catch (e) {
     yield put({ type: "POSTS_FETCH_FAILED", err: e.message })
   }
}

// Saga: will be fired on UPVOTE_POST_REQUESTED actions
function* upvotePost(action) {
   try {
     const result = yield call(Api.upvotePost, action.post, action.idToken)
     yield put(Actions.upvotePostSucceeded(result))
   } catch (e) {
     yield put(Actions.upvotePostFailed(e))
     NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on DOWNVOTE_POST_REQUESTED actions
function* downvotePost(action) {
   try {
     const result = yield call(Api.downvotePost, action.post, action.idToken)
     yield put(Actions.downvotePostSucceeded(result))
   } catch (e) {
     yield put(Actions.downvotePostFailed(e))
     NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on FLAG_POST_REQUESTED actions
function* flagPost(action) {
   try {
     const result = yield call(Api.flagPost, action.post, action.idToken)
     yield put(Actions.flagPostSucceeded(result))
   } catch (e) {
     yield put(Actions.flagPostFailed(e))
     NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on GET_POST_REQUESTED actions
function* getPost(action) {
   try {
     const result = yield call(Api.getPost, action.state, action.city, action.department, action.post)
     yield put(Actions.getPostSucceeded(result))
   } catch (e) {
     yield put(Actions.getPostFailed(e))
     NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on CREATE_POST_REQUESTED actions
function* createPost(action) {
   try {
     let data = action.data
     if (data.imageFile) {
       let image = yield call(uploadFile, AWS_S3_POST_FOLDER, data.imageFile)
       data.image = `${ AWS_S3 }/${ AWS_S3_BUCKET_NAME }/${ image.key }`
     }

     const result = yield call(Api.createPost, data, action.idToken)
     yield put(Actions.createPostSucceeded(result))
     NotificationManager.success('Your post is created successfully.', 'Create a Post')
   } catch (e) {
     yield put(Actions.createPostFailed(e))
     NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on UPDATE_POST_REQUESTED actions
function* updatePost(action) {
  console.log(action)
   try {
     let data = action.data
     if (data.imageFile) {
       let image = yield call(uploadFile, AWS_S3_POST_FOLDER, data.imageFile)
       data.image = `${ AWS_S3 }/${ AWS_S3_BUCKET_NAME }/${ image.key }`

       if (data.old.media) {
         let path = data.old.media.split('/')
         deleteFile(AWS_S3_POST_FOLDER, path[path.length - 1])
       }
     }

     const result = yield call(Api.updatePost, data, action.idToken)
     yield put(Actions.updatePostSucceeded(result))
     NotificationManager.success('Your changed is saved.', 'Edit Post')
   } catch (e) {
     yield put(Actions.createPostFailed(e))
     NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

// Saga: will be fired on DELETE_POST_REQUESTED actions
function* deletePost(action) {
   try {
     const result = yield call(Api.deletePost, action.data, action.idToken)
     yield put(Actions.deletePostSucceeded(result))
     NotificationManager.success('The post is deleted.', 'Delete Post')
   } catch (e) {
     yield put(Actions.deletePostFailed(e))
     NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* postsSaga() {
  yield takeLatest(Types.POSTS_FETCH_REQUESTED, fetchPosts)
  yield takeLatest(Types.UPVOTE_POST_REQUESTED, upvotePost)
  yield takeLatest(Types.DOWNVOTE_POST_REQUESTED, downvotePost)
  yield takeLatest(Types.FLAG_POST_REQUESTED, flagPost)
  yield takeLatest(Types.GET_POST_REQUESTED, getPost)
  yield takeLatest(Types.CREATE_POST_REQUESTED, createPost)
  yield takeLatest(Types.UPDATE_POST_REQUESTED, updatePost)
  yield takeLatest(Types.DELETE_POST_REQUESTED, deletePost)
}
