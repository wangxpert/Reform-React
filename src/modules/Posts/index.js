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

import {
  postsFetchRequested
} from '../../actions/posts';

// Import styles
import './styles/styles.css';

// Import components
import AlertBox from './components/AlertBox';
import MobileApps from './components/MobileApps';
import SponsoredAds from './components/SponsoredAds';
import CategorySelector from './components/CategorySelector';
import DepartmentBanner from './components/DepartmentBanner';
import PostBlock from './components/PostBlock';

// Import routes

class Posts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showAlert: true
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
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
    const depart = this.props.region.departments.Items.find( ele => ( ele.department === departmentId ) );
    this.setState({ department: depart });

    this.props.dispatch(selectDepartment(departmentId));

    const region = this.props.region;
    this.props.dispatch(postsFetchRequested(region.selectedState, region.selectedCity, departmentId));
  }

  render() {

    var posts = null;
    if (this.props.posts && this.props.posts.posts) {
      posts = this.props.posts.posts.Items.map((ele, index) => (
        <PostBlock key={ index } post={ ele } />
      ));
    }

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

          {/* Department Posts */}
          <ul className="list-group media-list media-list-stream mb-5">
            { posts }
          </ul>
        </div>

        <div className="col-3">
          <SponsoredAds />
        </div>

      </div>
    )
  }
}

Posts.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    region: store.region,
    posts: store.posts
  };
}

export default connect(mapStateToProps)(Posts);
