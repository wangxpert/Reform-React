import callApi from '../utils/apiCaller';

export function fetchPosts(state, city, department, limit, nextKey = '') {
  return callApi(`states/${state}/cities/${city}/departments/${department}/posts?limit=${limit}&nextKey=${nextKey}`);
}
