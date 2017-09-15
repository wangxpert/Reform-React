import callApi, { API_URL } from '../utils/apiCaller'

export function advertiseInquiry(data) {
  return callApi(API_URL, 'advertising/inquiry', 'POST', data)
}
