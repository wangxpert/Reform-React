import { connect } from 'react-redux'

// Import View
import Post from './Post'

// Import Actions
import * as Actions from '../../../redux/actions/posts'
import { push, replace, goBack } from 'react-router-redux'


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: state.account.user,
    state: state.posts.state,
    session: state.auth.session,
    post: state.posts.post,
    comments: state.posts.comments,
    currentComment: state.posts.commentLongId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (state, city, department, post) => dispatch(Actions.getPostRequested(state, city, department, post)),
    updatePost: (data, idToken) => dispatch(Actions.updatePostRequested(data, idToken)),
    upvotePost: (post, idToken) => dispatch(Actions.upvotePostRequested(post, idToken)),
    downvotePost: (post, idToken) => dispatch(Actions.downvotePostRequested(post, idToken)),
    flagPost: (post, idToken) => dispatch(Actions.flagPostRequested(post, idToken)),
    deletePost: (post, idToken) => dispatch(Actions.deletePostRequested(post, idToken)),
    getComments: (post, limit, lastKey) => dispatch(Actions.getPostCommentsRequested(post, limit, lastKey)),
    addComment: (post, text, idToken) => dispatch(Actions.addCommentToPostRequested(post, text, idToken)),
    editComment: (post, commentId, text, idToken) => dispatch(Actions.updatePostCommentRequested(post, commentId, text, idToken)),
    deleteComment: (post, commentId, idToken) => dispatch(Actions.deletePostCommentRequested(post, commentId, idToken)),
    upvoteComment: (commentLongId, idToken) => dispatch(Actions.upvotePostCommentRequested(commentLongId, idToken)),
    downvoteComment: (commentLongId, idToken) => dispatch(Actions.downvotePostCommentRequested(commentLongId, idToken)),
    flagComment: (commentLongId, idToken) => dispatch(Actions.flagPostCommentRequested(commentLongId, idToken)),
    replaceLocation: (location) => dispatch(replace(location)),
    changeLocation: (location) => dispatch(push(location)),
    backLocation: () => dispatch(goBack())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
