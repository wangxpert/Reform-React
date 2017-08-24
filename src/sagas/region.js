import { put, call, takeLatest } from 'redux-saga/effects'
import Types from '../actions/types'
import * as Api from '../api/region'

// worker Saga: will be fired on STATES_FETCH_REQUESTED actions
function* fetchStates(action) {
   try {
      const states = yield call(Api.fetchStates)
      yield put({ type: "STATES_FETCH_SUCCEEDED", states: states })
   } catch (e) {
      yield put({ type: "STATES_FETCH_FAILED", err: e.message })
   }
}

function* fetchCities(action) {
   try {
      const cities = yield call(Api.fetchCities, action.state)
      yield put({ type: "CITIES_FETCH_SUCCEEDED", cities: cities })
   } catch (e) {
      yield put({ type: "CITIES_FETCH_FAILED", err: e.message })
   }
}

function* fetchDepartments(action) {
   try {
      const departments = yield call(Api.fetchDepartments, action.state, action.city)
      yield put({ type: "DEPARTMENTS_FETCH_SUCCEEDED", departments: departments })
   } catch (e) {
      yield put({ type: "DEPARTMENTS_FETCH_FAILED", err: e.message })
   }
}

/*
  Does not allow concurrent fetches.
*/
export function* regionSaga() {
  yield takeLatest(Types.STATES_FETCH_REQUESTED, fetchStates)
  yield takeLatest(Types.CITIES_FETCH_REQUESTED, fetchCities)
  yield takeLatest(Types.DEPARTMENTS_FETCH_REQUESTED, fetchDepartments)
}
