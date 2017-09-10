import callApi, { API_URL } from '../utils/apiCaller'

export function fetchStates(includeAdmin = false) {
  let url = 'states'
  if (includeAdmin === true) url +='?admin=1'

  return callApi(API_URL, url)
}

export function fetchCities(state) {
  return callApi(API_URL, `states/${state}/cities`)
}

export function fetchDepartments(state, city) {
  return callApi(API_URL, `states/${state}/cities/${city}/departments`)
}
