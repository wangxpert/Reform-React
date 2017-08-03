import fetch from 'isomorphic-fetch';

export const API_URL = 'https://xqfrh2rbbc.execute-api.us-east-1.amazonaws.com/dev';

export default function callApi(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
  .then(response => {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
	})
}
