import callApi from '../utils/apiCaller';

export function fetchPosts(state, city, department, limit, lastKey) {

  const LastEvaluatedKey = lastKey;

  return callApi(`states/${state}/cities/${city}/departments/${department}/posts2?limit=${limit}`, 'post', { LastEvaluatedKey } );
}
