import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  statesFetchRequested,
  citiesFetchRequested,
  departmentsFetchRequested,
  selectState,
  selectCity,
  selectDepartment
} from '../../actions/region';

// Import styles
import './styles/styles.css';

// Import components
import AlertBox from './components/AlertBox';
import MobileApps from './components/MobileApps';
import SponsoredAds from './components/SponsoredAds';
import CategorySelector from './components/CategorySelector';
import DepartmentBanner from './components/DepartmentBanner';

// Import routes

class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showAlert: true
    }
  }

  componentWillMount() {
    const { dispatch, region } = this.props;
    dispatch(statesFetchRequested());
  }

  selectState(state) {
    this.props.dispatch(selectState(state));
    this.props.dispatch(citiesFetchRequested(state));
  }

  selectCity(city) {
    this.props.dispatch(selectCity(city));
    this.props.dispatch(departmentsFetchRequested(this.props.region.selectedState, city));
  }

  selectDepartment(departmentId) {
    this.props.dispatch(selectDepartment(departmentId));
    const depart = this.props.region.departments.Items.find( ele => ( ele.department === departmentId ) );
    this.setState({ department: depart });
  }

  render() {

    return (
      <div className='row page-layout__viewport'>
        <div className="col-3">
          { this.state.showAlert && <AlertBox closeAlert={e => (this.setState({ showAlert: false }))} /> }
          <MobileApps />
        </div>

        <div className="col-6">
          <CategorySelector states={ this.props.region.states } cities={ this.props.region.cities } departments={ this.props.region.departments }
            selectState={ this.selectState.bind(this) }  selectCity={ this.selectCity.bind(this) } selectDepartment={ this.selectDepartment.bind(this) } />

          <DepartmentBanner banner = { this.state.department ? this.state.department.banner : null }/>
        </div>

        <div className="col-3">
          <SponsoredAds />
        </div>

      </div>
    )
  }
}

Post.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    region: store.region
  };
}

export default connect(mapStateToProps)(Post);
