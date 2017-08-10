import { put, call, takeLatest } from 'redux-saga/effects';
import Types from '../actions/types';
import * as Api from '../api/posts';

// worker Saga: will be fired on POSTS_FETCH_REQUESTED actions
function* fetchPosts(action) {
   try {
      const posts = yield call(Api.fetchPosts, action.state, action.city, action.department, action.limit, action.lastKey);
      yield put({ type: "POSTS_FETCH_SUCCEEDED", posts: posts });
   } catch (e) {
      yield put({ type: "POSTS_FETCH_FAILED", err: e.message });
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* postsSaga() {
  yield takeLatest(Types.POSTS_FETCH_REQUESTED, fetchPosts);
}
