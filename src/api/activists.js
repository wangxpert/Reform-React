import callApi from '../utils/apiCaller'

export function fetchActivists(state, city, limit, lastKey) {

  const LastEvaluatedKey = lastKey
  return callApi(`states/${state}/cities/${city}/activism?limit=${limit}`, 'post', { LastEvaluatedKey })
}
