import callApi, { ACTIVISM_API_URL } from '../utils/apiCaller'

export function fetchActivists(state, city, limit, lastKey) {

  const LastEvaluatedKey = lastKey
  return callApi(ACTIVISM_API_URL, `activism?co=us&st=${state}&ct=${city}&limit=${limit}`, 'post', { LastEvaluatedKey })
}
