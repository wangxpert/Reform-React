import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Assets

export default class CategorySelector extends Component {

  componentDidMount() {
    if (this.props.selectedState && !this.props.cities) this.props.selectState(this.props.selectedState)
    if (this.props.selectedCity) this.props.selectCity(this.props.selectedCity)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.states !== this.props.states && nextProps.states) {
      this.props.selectState(nextProps.states.Items[0].stateid)
    }

    if (nextProps.cities !== this.props.cities && nextProps.cities && nextProps.cities.Items.length) {
      this.props.selectCity(nextProps.cities.Items[0].city)
    }
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

  render() {
    var stateOptions = null
    var cityOptions = null

    if (this.props.states)
      stateOptions = this.props.states.Items.map(this.makeStateOption)

    if (this.props.cities)
      cityOptions = this.props.cities.Items.map(this.makeCityOption)

    return (
      <ul className="list-group media-list media-list-stream mb-4">
        <li className="media">
        </li>
        <li className="media list-group-item p-4">
          <div className="container">
            {/* State Picker */}
            <div className="form-group row">
              <label htmlFor="location-input" className="col-3 col-form-label">State</label>
              <div className="col-9">
                <select name="state" className="form-control postsview_select" value={ this.props.selectedState } onChange={ e => this.props.selectState(e.target.value) }>
                  { stateOptions }
                </select>
                {/* <p>Selected state is {this.props.selectedState}</p> */}
              </div>
            </div>
            {/* City Picker */}
            <div className="form-group row">
              <label htmlFor="location-input" className="col-3 col-form-label">City</label>
              <div className="col-9" id="locations">
                <select className="form-control" id="the_locations" value={ this.props.selectedCity } onChange={ e => this.props.selectCity( e.target.value ) }>
                  { cityOptions }
                </select>
                {/* <p>Selected city is {this.props.selectedCity}</p> */}
              </div>
            </div>
          </div>
        </li>
     </ul>
    )
  }
}

CategorySelector.propTypes = {
  states: PropTypes.object,
  cities: PropTypes.object,
  selectedState: PropTypes.string,
  selectedCity: PropTypes.string
}
