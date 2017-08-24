import callApi from '../utils/apiCaller'

export function fetchStates() {
  return callApi('states')
}

export function fetchCities(state) {
  return callApi(`states/${state}/cities`)
}

export function fetchDepartments(state, city) {
  return callApi(`states/${state}/cities/${city}/departments`)
}
