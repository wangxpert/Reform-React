import callApi, { POST_API_URL } from '../utils/apiCaller'

export function fetchPosts(state, city, department, limit, lastKey) {
  const LastEvaluatedKey = lastKey

  return callApi(POST_API_URL, `states/${state}/cities/${city}/departments/${department}/posts?limit=${limit}`, 'POST', { LastEvaluatedKey } )
}

export function upvotePost(post, idToken) {
  return callApi(POST_API_URL, `states/${post.state}/cities/${post.city}/departments/${post.department}/posts/${post.post}/upvote`, 'PUT', null, idToken)
}

export function downvotePost(post, idToken) {
  return callApi(POST_API_URL, `states/${post.state}/cities/${post.city}/departments/${post.department}/posts/${post.post}/downvote`, 'PUT', null, idToken)
}

export function flagPost(post, idToken) {
  return callApi(POST_API_URL, `states/${post.state}/cities/${post.city}/departments/${post.department}/posts/${post.post}/flag`, 'PUT', null, idToken)
}

export function createPost(data, idToken) {
  let body = {
    text: data.text,
    media: data.image
  }

  return callApi(POST_API_URL, `states/${data.state}/cities/${data.city}/departments/${data.department}/posts/create`, 'POST', body, idToken)
}

export function editPost(data, idToken) {
  let body = {
    text: data.text,
    media: data.image
  }

  return callApi(POST_API_URL, `states/${data.state}/cities/${data.city}/departments/${data.department}/posts/${data.post}`, 'PUT', body, idToken)
}

export function deletePost(data, idToken) {
  return callApi(POST_API_URL, `states/${data.state}/cities/${data.city}/departments/${data.department}/posts/${data.post}`, 'DELETE', null, idToken)
}
