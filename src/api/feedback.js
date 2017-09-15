import callApi, { API_URL } from '../utils/apiCaller'

export function submitFeedback(data) {
  return callApi(API_URL, 'feedback', 'POST', data)
}
