import { connect } from 'react-redux'

// Import View
import Feedback from './Feedback'

// Import Actions
import * as Actions from '../../redux/actions/feedback'
import { push } from 'react-router-redux'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    state: state.feedback.state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitFeedback: (data) => dispatch(Actions.submitFeedbackRequested(data)),
    changeLocation: (path) => dispatch(push(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
