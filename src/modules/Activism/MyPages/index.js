import { connect } from 'react-redux'

// Import View
import MyPages from './MyPages'

// Import Actions
import { resetMyPages, getMyPagesRequested } from '../../../redux/actions/activism'
import { push } from 'react-router-redux'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    session: state.auth.session,
    myPages: state.activism.myPages,
    state: state.activism.state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetMyPages: () => dispatch(resetMyPages()),
    getMyPages: (limit, lastKey, idToken) => dispatch(getMyPagesRequested(limit, lastKey, idToken)),
    changeLocation: (location) => dispatch(push(location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPages)
