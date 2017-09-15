import callApi, { API_URL } from '../utils/apiCaller'

export function blowWhistle(data) {
  return callApi(API_URL, 'whistleblowers', 'POST', data)
}
