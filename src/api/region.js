import callApi, { API_URL } from '../utils/apiCaller'

export function fetchStates() {
  return callApi(API_URL, 'states')
}

export function fetchCities(state) {
  return callApi(API_URL, `states/${state}/cities`)
}

export function fetchDepartments(state, city) {
  return callApi(API_URL, `states/${state}/cities/${city}/departments`)
}
