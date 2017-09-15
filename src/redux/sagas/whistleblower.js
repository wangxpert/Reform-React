import { put, call, takeLatest } from 'redux-saga/effects'

import Types from '../actions/types'

import * as Api from '../../api/whistleblower'

import * as Actions from '../actions/whistleblower'

import { NotificationManager } from 'react-notifications'

import { errorMessage } from '../../utils/error'

// Saga: will be fired on BLOW_WHISTLE_REQUESTED actions
function* blowWhistle(action) {
   try {
     const result = yield call(Api.blowWhistle, action.data)
     yield put(Actions.blowWhistleSucceeded(result))
     NotificationManager.success('Thank you. Your information will be held in strict confidence.', 'Blow Whistle')
   } catch (e) {
     yield put(Actions.blowWhistleFailed(e))
     NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* whistleBlowerSaga() {
  yield takeLatest(Types.BLOW_WHISTLE_REQUESTED, blowWhistle)
}
