import callApi, { API_URL } from '../utils/apiCaller'

export function getCityOfficials(state, city) {
  return callApi(API_URL, `states/${state}/cities/${city}/officials`)
}
