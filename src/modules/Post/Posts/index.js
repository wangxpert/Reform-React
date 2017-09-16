import { connect } from 'react-redux'

// Import Actions
import {
  statesFetchRequested,
  citiesFetchRequested,
  departmentsFetchRequested,
  selectState,
  selectCity,
  selectDepartment
} from '../../../redux/actions/region'

import {
  resetPosts,
  postsFetchRequested,
  upvotePostRequested,
  downvotePostRequested,
  flagPostRequested,
  deletePostRequested
} from '../../../redux/actions/posts'

import { push } from 'react-router-redux'

// Import View
import Posts from './Posts'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    region: state.region,
    posts: state.posts,
    auth: state.auth,
    user: state.account.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    statesFetchRequested: (includeAdmin) => dispatch(statesFetchRequested(includeAdmin)),
    citiesFetchRequested: (state) => dispatch(citiesFetchRequested(state)),
    departmentsFetchRequested: (state, city) => dispatch(departmentsFetchRequested(state, city)),
    selectState: (state) => dispatch(selectState(state)),
    selectCity: (city) => dispatch(selectCity(city)),
    selectDepartment: (department) => dispatch(selectDepartment(department)),
    postsFetchRequested: (state, city, department) => dispatch(postsFetchRequested(state, city, department)),
    resetPosts: () => dispatch(resetPosts()),
    upvotePost: (post, idToken) => dispatch(upvotePostRequested(post, idToken)),
    downvotePost: (post, idToken) => dispatch(downvotePostRequested(post, idToken)),
    flagPost: (post, idToken) => dispatch(flagPostRequested(post, idToken)),
    deletePost: (data, idToken) => dispatch(deletePostRequested(data, idToken)),
    changeLocation: (path) => dispatch(push(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
