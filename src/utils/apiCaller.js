import fetch from 'isomorphic-fetch'

export const API_URL = 'https://3ybia6k930.execute-api.us-east-1.amazonaws.com/dev'
export const POST_API_URL = 'https://poqsfjosu4.execute-api.us-east-1.amazonaws.com/dev'
export const ACTIVISM_API_URL = 'https://l91wzx5wg2.execute-api.us-east-1.amazonaws.com/dev'

export default function callApi(baseUrl, endpoint, method = 'get', body, idToken) {
  return fetch(`${baseUrl}/${endpoint}`, {
    headers: { 'content-type': 'application/json', 'Authorization': idToken },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) return Promise.reject(json)
    else return json
  })
  .then(
    response => response,
    error => {
      throw error
    }
  )
}
