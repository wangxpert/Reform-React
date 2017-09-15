import { put, call, takeLatest } from 'redux-saga/effects'

import Types from '../actions/types'

import * as Api from '../../api/feedback'

import * as Actions from '../actions/feedback'

import { NotificationManager } from 'react-notifications'

import { errorMessage } from '../../utils/error'

// Saga: will be fired on ADVERTISE_INQUIRY_REQUESTED actions
function* submitFeedback(action) {
   try {
     const result = yield call(Api.submitFeedback, action.data)
     yield put(Actions.submitFeedbackSucceeded(result))
     NotificationManager.success('Thank you for giving us your feedback', 'Feedback')
   } catch (e) {
     yield put(Actions.submitFeedbackFailed(e))
     NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* feedbackSaga() {
  yield takeLatest(Types.SUBMIT_FEEDBACK_REQUESTED, submitFeedback)
}
