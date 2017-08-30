import callApi, { ACTIVISM_API_URL } from '../utils/apiCaller'

export function createActivismPage(info, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/create?st=${ info.state }&ct=${ info.city }`, 'post', info, idToken)
}
