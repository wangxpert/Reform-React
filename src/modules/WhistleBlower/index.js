import { connect } from 'react-redux'

// Import View
import WhistleBlower from './WhistleBlower'

// Import Actions
import * as Actions from '../../redux/actions/whistleblower'
import { push } from 'react-router-redux'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    state: state.whistleblower.state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    blowWhistle: (data) => dispatch(Actions.blowWhistleRequested(data)),
    changeLocation: (path) => dispatch(push(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WhistleBlower)
