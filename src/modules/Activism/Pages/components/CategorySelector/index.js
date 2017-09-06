import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Assets

export default class CategorySelector extends Component {

  constructor(props) {
    super(props)

    this.state = {
      includingStates: true,
      includingCities: true
    }
  }

  componentDidMount() {
    /*if (this.props.selectedState && !this.props.cities) this.props.selectState(this.props.selectedState)
    if (this.props.selectedCity) this.props.selectCity(this.props.selectedCity)*/
    this.props.selectState('')
    this.props.selectCity('')
  }

  componentWillReceiveProps(nextProps) {
    /*if (nextProps.states !== this.props.states && nextProps.states) {
      this.props.selectState(nextProps.states.Items[0].stateid)
    }

    if (nextProps.cities !== this.props.cities && nextProps.cities && nextProps.cities.Items.length) {
      this.props.selectCity(nextProps.cities.Items[0].city)
    }*/
  }

  makeStateOption(state) {
    return (
      <option key={ state.stateid } value={ state.stateid }>{ state.name }</option>
    )
  }

  makeCityOption(city) {
    return (
      <option key={ city.city } value={ city.city }>{ city.name }</option>
    )
  }

  makeDepartmentOption(department) {
    return (
      <option key={ `${department.city}-${department.department}` } value={ department.department }>{ department.name }</option>
    )
  }

  includeStates(including) {
    this.setState({ includingStates: including })
    this.props.includeStates(including)

  }

  includeCities(including) {
    this.setState({ includingCities: including })
    this.props.includeCities(including)
  }

  render() {
    var stateOptions = null
    var cityOptions = null

    if (this.props.states)
      stateOptions = this.props.states.Items.map(this.makeStateOption)

    if (this.props.cities)
      cityOptions = this.props.cities.Items.map(this.makeCityOption)

    return (
      <div className="pt-5 pb-1 px-3">
        <div className="container">
          {/* Country */}
          <div className="form-group row">
            <label htmlFor="location-input" className="col-3 col-form-label">Country</label>
            <div className="col-9">
              <select name="country" className="form-control" value={ this.props.selectedCountry } >
                <option value={'us'}>United States</option>
              </select>

              <input type="checkbox" name="includingStates" checked={ this.state.includingStates } onChange={ e => this.includeStates(e.target.checked) }  /> Including all states
            </div>
          </div>
          {/* State Picker */}
          <div className="form-group row">
            <label htmlFor="state" className="col-3 col-form-label">State</label>
            <div className="col-9">
              <select name="state" id="state" className="form-control"
                value={ this.props.selectedState } onChange={ e => this.props.selectState(e.target.value) }
                disabled={ this.state.includingStates }>
                <option value=""></option>
                { stateOptions }
              </select>

              <input type="checkbox" name="includingCities" checked={ this.state.includingCities } onChange={ e => this.includeCities(e.target.checked) } /> Including all cities
            </div>
          </div>
          {/* City Picker */}
          <div className="form-group row">
            <label htmlFor="city" className="col-3 col-form-label">City</label>
            <div className="col-9" id="locations">
              <select name="city" id="city" className="form-control"
                value={ this.props.selectedCity } onChange={ e => this.props.selectCity( e.target.value ) }
                disabled={ this.state.includingCities || this.state.includingStates }>
                <option value=""></option>
                { cityOptions }
              </select>
            </div>
          </div>

        </div>
        <br/>
        <hr />
     </div>
    )
  }
}

CategorySelector.propTypes = {
  states: PropTypes.object,
  cities: PropTypes.object,
  selectedState: PropTypes.string,
  selectedCity: PropTypes.string
}
