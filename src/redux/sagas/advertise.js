import { put, call, takeLatest } from 'redux-saga/effects'

import Types from '../actions/types'

import * as Api from '../../api/advertise'

import * as Actions from '../actions/advertise'

import { NotificationManager } from 'react-notifications'

import { errorMessage } from '../../utils/error'

// Saga: will be fired on ADVERTISE_INQUIRY_REQUESTED actions
function* advertiseInquiry(action) {
   try {
     const result = yield call(Api.advertiseInquiry, action.data)
     yield put(Actions.advertiseInquirySucceeded(result))
     NotificationManager.success('Thank you for your inquiry. We will be contacting you shortly.', 'Advertise')
   } catch (e) {
     yield put(Actions.advertiseInquiryFailed(e))
     NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* advertiseSaga() {
  yield takeLatest(Types.ADVERTISE_INQUIRY_REQUESTED, advertiseInquiry)
}
