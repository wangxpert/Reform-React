import callApi, { POST_API_URL } from '../utils/apiCaller'

export function fetchPosts(state, city, department, limit, lastKey) {
  const LastEvaluatedKey = lastKey

  return callApi(POST_API_URL, `states/${state}/cities/${city}/departments/${department}/posts?limit=${limit}`, 'post', { LastEvaluatedKey } )
}

export function upvotePost(state, city, department, post, idToken) {
  return callApi(POST_API_URL, `states/${state}/cities/${city}/departments/${department}/posts/${post}/upvote`, 'put', {}, idToken)
}
