import callApi from '../utils/apiCaller';

export function fetchPosts(state, city, department) {
  return callApi(`states/${state}/cities/${city}/departments/${department}/posts`);
}
