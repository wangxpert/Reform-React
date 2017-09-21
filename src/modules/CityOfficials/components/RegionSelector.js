import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RegionSelector extends Component {

  componentWillMount() {
    if (this.props.selectedState && !this.props.cities) this.props.selectedState(this.props.selectedState)
    if (this.props.selectedCity) this.props.selectCity(this.props.selectedCity)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.states !== this.props.states && nextProps.states) {
      this.props.selectState(nextProps.states.Items[1].stateid)
    }

    if (nextProps.cities !== this.props.cities && nextProps.cities && nextProps.cities.Items.length) {
      this.props.selectCity(nextProps.cities.Items[0].city)
    }
  }

  makeStateOption(state, index) {
    if (index === 0 ) return null
    return (
      <option key={ state.stateid } value={ state.stateid }>{ state.name }</option>
    )
  }

  makeCityOption(city) {
    return (
      <option key={ city.city } value={ city.city }>{ city.name }</option>
    )
  }

  render() {
    var stateOptions = null
    var cityOptions = null

    if (this.props.states)
      stateOptions = this.props.states.Items.map(this.makeStateOption)

    if (this.props.cities)
      cityOptions = this.props.cities.Items.map(this.makeCityOption)

    return (
      <div className=" pb-0 px-3">
        <div className="col-12">
          <hr />
          <br />
          <div className="form-group row">
            {/* State Picker */}
            <label htmlFor="location-input" className="col-3 col-form-label">State</label>
            <div className="col-9">
              <select name="state" className="form-control" value={ this.props.selectedState } onChange={ e => this.props.selectState(e.target.value) }>
                { stateOptions }
              </select>
            </div>
          </div>
          {/* City Picker */}
          <div className="form-group row">
            <label htmlFor="location-input" className="col-3 col-form-label">City</label>
            <div className="col-9" id="locations">
              <select className="form-control" id="the_locations" value={ this.props.selectedCity } onChange={ e => this.props.selectCity( e.target.value ) }>
                { cityOptions }
              </select>
            </div>
          </div>
          <br />
          <hr />
        </div>
      </div>
    )
  }
}

RegionSelector.propTypes = {
  states: PropTypes.object,
  cities: PropTypes.object,

  selectedState: PropTypes.string,
  selectedCity: PropTypes.string,

  selectState: PropTypes.func,
  selectCity: PropTypes.func,
}

export default RegionSelector
