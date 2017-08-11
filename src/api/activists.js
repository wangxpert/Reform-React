import callApi from '../utils/apiCaller';

export function fetchActivists(state, city, limit, lastKey) {

  const LastEvaluatedKey = lastKey;
  return callApi(`states/${state}/cities/${city}/activism2?limit=${limit}`, 'post', { LastEvaluatedKey });
}

export function fetchActivist(state, city, activist) {
  return callApi(`states/${state}/cities/${city}/activism2/${activist}`);
}
