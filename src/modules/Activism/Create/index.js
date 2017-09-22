import { connect } from 'react-redux'

// Import View
import Create from './Create'

// Import Actions
import { createActivismPageRequested } from '../../../redux/actions/activism'
import { push } from 'react-router-redux'

import {
  statesFetchRequested,
  citiesFetchRequested,
  selectState,
  selectCity,
} from '../../../redux/actions/region'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: state.account.user,
    states: state.region.states,
    cities: state.region.cities,
    state: state.activism.state,
    result: state.activism.result,
    session: state.auth.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    statesFetchRequested: () => dispatch(statesFetchRequested()),
    citiesFetchRequested: (state) => dispatch(citiesFetchRequested(state)),
    selectState: (state) => dispatch(selectState(state)),
    selectCity: (city) => dispatch(selectCity(city)),
    createActivismPage: (info, idToken) => dispatch(createActivismPageRequested(info, idToken)),
    changeLocation: (path) => dispatch(push(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)
