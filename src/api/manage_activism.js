import callApi, { ACTIVISM_API_URL } from '../utils/apiCaller'

export function createActivismPage(info, idToken) {
  let url = 'activism/create?'
  if (info.state) url += `st=${ info.state }&`
  if (info.city) url += `ct=${ info.city }&`

  return callApi(ACTIVISM_API_URL, url, 'post', info, idToken)
}
