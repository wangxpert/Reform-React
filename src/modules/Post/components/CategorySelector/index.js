import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Assets
import HomepageBannerImg from '../../assets/homepage-banner.jpg';

export default class CategorySelector extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.states !== this.props.states) {
      this.props.selectState(nextProps.states.Items[0].stateid);
    }

    if (nextProps.cities !== this.props.cities) {
      this.props.selectCity(nextProps.cities.Items[0].city);
    }

    if (nextProps.departments !== this.props.departments) {
      this.props.selectDepartment(nextProps.cities.Items[0].department);
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
    var stateOptions = null;
    var cityOptions = null;
    var departOptions = null;
    if (this.props.states)
      stateOptions = this.props.states.Items.map(this.makeStateOption);

    if (this.props.cities)
      cityOptions = this.props.cities.Items.map(this.makeCityOption);

    if (this.props.departments)
      departOptions = this.props.departments.Items.map(this.makeDepartmentOption);

    return (
      <ul className="list-group media-list media-list-stream mb-4">
        <li className="media">
          <img className="postsview_img" src={HomepageBannerImg} />
        </li>
        <li className="media list-group-item p-4">
          <div className="container">
            {/* State Picker */}
            <div className="form-group row">
              <label htmlFor="location-input" className="col-3 col-form-label">State</label>
              <div className="col-9">
                <select name="state" className="form-control postsview_select" defaultValue={ this.props.selectedState } onChange={ e => this.props.selectState(e.target.value) }>
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
            {/* Department Picker */}
            <div className="form-group row" id="categoryDropdownDiv">
              <label htmlFor="example-text-input" className="col-3 col-form-label">Category</label>
              <div className="col-9" id="departments">
                <select className="form-control" id="the_departments" value={ this.props.selectedDepartment } onChange={ e => this.props.selectDepartment(e.target.value) }>
                  { departOptions }
                </select>
                {/* <p>Selected department is {this.props.selectedDepartment}</p> */}
              </div>
            </div>
          </div>
        </li>
     </ul>
    )
  }
}

CategorySelector.propTypes = {
  states: PropTypes.Object,
  cities: PropTypes.Object,
  category: PropTypes.Object
};
