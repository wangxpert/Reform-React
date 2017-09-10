import { connect } from 'react-redux'

// Import View
import CreatePost from './Create'

// Import Actions
import { createPostRequested } from '../../../redux/actions/posts'

import {
  departmentsFetchRequested
} from '../../../redux/actions/region'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: state.account.user,
    departments: state.region.departments,
    state: state.posts.state,
    session: state.auth.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDepartments: (state, city) => dispatch(departmentsFetchRequested(state, city)),
    createPost: (data, idToken) => dispatch(createPostRequested(data, idToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
