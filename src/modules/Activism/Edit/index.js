import { connect } from 'react-redux'

// Import View
import Edit from './Edit'

// Import Actions
import * as Actions from '../../../redux/actions/activism'

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
    session: state.auth.session,
    selectedState: state.region.selectedState,
    selectedCity: state.region.selectedCity,
    page: state.activism.activismPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getActivismPage: (pageId) => dispatch(Actions.getActivismPageRequested(pageId)),
    statesFetchRequested: () => dispatch(statesFetchRequested()),
    citiesFetchRequested: (state) => dispatch(citiesFetchRequested(state)),
    selectState: (state) => dispatch(selectState(state)),
    selectCity: (city) => dispatch(selectCity(city)),
    updateActivismPage: (pageId, data, idToken) => dispatch(Actions.updateActivismPageRequested(pageId, data, idToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
