import { connect } from 'react-redux'

// Import Actions
import * as Actions from '../../redux/actions/city_officials'

import {
  statesFetchRequested,
  citiesFetchRequested,
  selectState,
  selectCity
} from '../../redux/actions/region'

// Import View
import CityOfficials from './CityOfficials'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    officials: state.cityOfficials.officials,
    region: state.region,
    user: state.account.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getOfficials: (state, city) => dispatch(Actions.getCityOfficialsRequested(state, city)),
    getStates: (includeAdmin) => dispatch(statesFetchRequested(includeAdmin)),
    getCities: (state) => dispatch(citiesFetchRequested(state)),
    selectState: (state) => dispatch(selectState(state)),
    selectCity: (city) => dispatch(selectCity(city)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityOfficials)
