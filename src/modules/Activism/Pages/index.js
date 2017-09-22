import { connect } from 'react-redux'

// Import Actions
import {
  statesFetchRequested,
  citiesFetchRequested,
  selectState,
  selectCity
} from '../../../redux/actions/region'

import {
  resetActivists,
  activistsFetchRequested
} from '../../../redux/actions/activism'

import { push } from 'react-router-redux'

// Import View
import Pages from './Pages'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: state.account.user,
    region: state.region,
    activism: state.activism
  }
}

function mapDispatchToProps(dispatch) {
  return {
    statesFetchRequested: (includeAdmin) => dispatch(statesFetchRequested(includeAdmin)),
    citiesFetchRequested: (state) => dispatch(citiesFetchRequested(state)),
    selectState: (state) => dispatch(selectState(state)),
    selectCity: (city) => dispatch(selectCity(city)),
    activistsFetchRequested: (state, city, includingStates, includingCities) => dispatch(activistsFetchRequested(state, city, includingStates, includingCities)),
    resetActivists: () => dispatch(resetActivists()),
    changeLocation: (path) => dispatch(push(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages)
