import { connect } from 'react-redux'

// Import View
import EditPost from './Edit'

// Import Actions
import { updatePostRequested, getPostRequested } from '../../../redux/actions/posts'
import { replace } from 'react-router-redux'

import {
  departmentsFetchRequested
} from '../../../redux/actions/region'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: state.account.user,
    departments: state.region.departments,
    state: state.posts.state,
    session: state.auth.session,
    post: state.posts.post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDepartments: (state, city) => dispatch(departmentsFetchRequested(state, city)),
    getPost: (state, city, department, post) => dispatch(getPostRequested(state, city, department, post)),
    updatePost: (data, idToken) => dispatch(updatePostRequested(data, idToken)),
    replaceLocation: (location) => dispatch(replace(location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
