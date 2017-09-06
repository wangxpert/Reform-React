import React, { Component } from 'react'
import { connect } from 'react-redux'

// Import Actions
import * as Actions from '../../../redux/actions/activism'

// Import View
import Page from './Page'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    auth: state.auth,
    page: state.activism.activismPage,
    state: state.activism.state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getActivismPage: (pageId) => dispatch(Actions.getActivismPageRequested(pageId)),
    addUserEmailToActivismPage: (pageId, email) => dispatch(Actions.addUserEmailToActivismPageRequested(pageId, email)),
    getActivismPageComments: (pageId, limit, lastKey) => dispatch(Actions.getActivismPageCommentsRequested(pageId, limit, lastKey)),
    addComment: (pageId, content, idToken) => dispatch(Actions.addCommentToActivismPageRequested(pageId, content, idToken)),
    upvotePage: (pageId, idToken) => dispatch(Actions.upvoteActivismPageRequested(pageId, idToken)),
    downvotePage: (pageId, idToken) => dispatch(Actions.downvoteActivismPageRequested(pageId, idToken)),
    flagPage: (pageId, idToken) => dispatch(Actions.flagActivismPageRequested(pageId, idToken)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
