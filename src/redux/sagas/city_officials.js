import { put, call, takeLatest } from 'redux-saga/effects'

import Types from '../actions/types'

import * as Api from '../../api/city_officials'

import * as Actions from '../actions/city_officials'

import { NotificationManager } from 'react-notifications'

import { errorMessage } from '../../utils/error'

// Saga: will be fired on GET_CITY_OFFICIALS_REQUESTED actions
function* getCityOfficials(action) {
   try {
     const result = yield call(Api.getCityOfficials, action.state, action.city)
     yield put(Actions.getCityOfficialsSucceeded(result))
   } catch (e) {
     yield put(Actions.getCityOfficialsFailed(e))
     NotificationManager.error(errorMessage(e.errorMessage), 'Error...')
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* cityOfficialsSaga() {
  yield takeLatest(Types.GET_CITY_OFFICIALS_REQUESTED, getCityOfficials)
}
