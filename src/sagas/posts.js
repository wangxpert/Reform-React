import { put, call, takeLatest } from 'redux-saga/effects'
import Types from '../actions/types'
import * as Api from '../api/posts'
import * as Actions from '../actions/posts'

import { NotificationManager } from 'react-notifications'

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
     yield call(Api.upvotePost, action.state, action.city, action.department, action.post, action.idToken)
     yield put(Actions.upvotePostSucceeded(action.state, action.city, action.department, action.post))
   } catch (e) {
     NotificationManager.error(e.errorMessage.replace(/^\[.*\]/, ''), 'Error...')
     yield put(Actions.upvotePostFailed(e.errorMessage))
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* postsSaga() {
  yield takeLatest(Types.POSTS_FETCH_REQUESTED, fetchPosts)
  yield takeLatest(Types.UPVOTE_POST_REQUESTED, upvotePost)
}
