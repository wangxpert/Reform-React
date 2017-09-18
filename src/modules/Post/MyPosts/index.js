import { connect } from 'react-redux'

// Import Actions
import {
  resetMyPosts,
  getMyPostsRequested,
  upvotePostRequested,
  downvotePostRequested,
  flagPostRequested,
  deletePostRequested
} from '../../../redux/actions/posts'

import { push } from 'react-router-redux'

// Import View
import MyPosts from './MyPosts'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    myPosts: state.posts.myPosts,
    currentPost: state.posts.currentPost,
    session: state.auth.session,
    user: state.account.user,
    state: state.posts.state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetMyPosts: () => dispatch(resetMyPosts()),
    getMyPosts: (limit, lastKey, idToken) => dispatch(getMyPostsRequested(limit, lastKey, idToken)),
    upvotePost: (post, idToken) => dispatch(upvotePostRequested(post, idToken)),
    downvotePost: (post, idToken) => dispatch(downvotePostRequested(post, idToken)),
    flagPost: (post, idToken) => dispatch(flagPostRequested(post, idToken)),
    deletePost: (data, idToken) => dispatch(deletePostRequested(data, idToken)),
    changeLocation: (path) => dispatch(push(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)
