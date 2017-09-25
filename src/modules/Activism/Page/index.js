import { connect } from 'react-redux'

// Import Actions
import * as Actions from '../../../redux/actions/activism'
import { push } from 'react-router-redux'

// Import View
import Page from './Page'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.account.user,
    page: state.activism.activismPage,
    state: state.activism.state,
    comments: state.activism.comments,
    currentComment: state.activism.commentId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getActivismPage: (pageId) => dispatch(Actions.getActivismPageRequested(pageId)),
    addUserEmailToActivismPage: (pageId, email) => dispatch(Actions.addUserEmailToActivismPageRequested(pageId, email)),
    getActivismPageComments: (pageId, limit, lastKey) => dispatch(Actions.getActivismPageCommentsRequested(pageId, limit, lastKey)),
    addComment: (pageId, text, idToken) => dispatch(Actions.addCommentToActivismPageRequested(pageId, text, idToken)),
    upvotePage: (pageId, idToken) => dispatch(Actions.upvoteActivismPageRequested(pageId, idToken)),
    downvotePage: (pageId, idToken) => dispatch(Actions.downvoteActivismPageRequested(pageId, idToken)),
    flagPage: (pageId, idToken) => dispatch(Actions.flagActivismPageRequested(pageId, idToken)),
    deletePage: (pageId, idToken) => dispatch(Actions.deleteActivismPageRequested(pageId, idToken)),
    followPage: (pageId, idToken) => dispatch(Actions.followActivismPageRequested(pageId, idToken)),
    upvoteComment: (pageId, commentId, idToken) => dispatch(Actions.upvoteCommentRequested(pageId, commentId, idToken)),
    downvoteComment: (pageId, commentId, idToken) => dispatch(Actions.downvoteCommentRequested(pageId, commentId, idToken)),
    flagComment: (pageId, commentId, idToken) => dispatch(Actions.flagCommentRequested(pageId, commentId, idToken)),
    deleteComment: (pageId, commentId, idToken) => dispatch(Actions.deleteCommentRequested(pageId, commentId, idToken)),
    editComment: (pageId, commentId, text, idToken) => dispatch(Actions.updateCommentRequested(pageId, commentId, text, idToken)),
    changeLocation: (location) => dispatch(push(location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
