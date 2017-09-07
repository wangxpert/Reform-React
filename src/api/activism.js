import callApi, { ACTIVISM_API_URL } from '../utils/apiCaller'

export function fetchActivists(state, city, includingStates, includingCities, limit, lastKey) {

  var url = 'activism?co=us'
  if (includingStates === true) {
    url += '&ic'
  } else {
    url += `&st=${ state }`
    if (includingCities === true) {
      url += '&ic'
    } else {
      url += `&ct=${ city }`
    }
  }

  if (limit) url += `&limit=${limit}`
  return callApi(ACTIVISM_API_URL, url, 'post', { LastEvaluatedKey: lastKey })
}

export function getActivismPage(pageId) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }`)
}

export function createActivismPage(info, idToken) {
  let url = 'activism/create?'
  if (info.state) url += `st=${ info.state }&`
  if (info.city) url += `ct=${ info.city }&`

  return callApi(ACTIVISM_API_URL, url, 'post', info, idToken)
}

export function addUserEmailToActivismPage(pageId, email) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/emails`, 'put', { email })
}

export function getActivismPageComments(pageId, limit, lastKey) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/comments?limit=${ limit }`, 'post', { LastEvaluatedKey: lastKey })
}

export function upvoteActivismPage(pageId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/upvote`, 'put', null, idToken)
}

export function downvoteActivismPage(pageId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/downvote`, 'put', null, idToken)
}

export function flagActivismPage(pageId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/flag`, 'put', null, idToken)
}

export function followActivismPage(pageId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/follow`, 'put', null, idToken)
}

export function addCommentToActivismPage(pageId, content, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/comments/create`, 'post', { content }, idToken)
}

export function upvoteComment(pageId, commentId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/comments/${ commentId }/upvote`, 'put', null, idToken)
}

export function downvoteComment(pageId, commentId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/comments/${ commentId }/downvote`, 'put', null, idToken)
}

export function flagComment(pageId, commentId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/comments/${ commentId }/flag`, 'put', null, idToken)
}
