import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import ActivistBlock from './ActivistBlock';
import CategorySelector from './CategorySelector';

// Import Actions
import {
  statesFetchRequested,
  citiesFetchRequested,
  selectState,
  selectCity
} from '../../../actions/region';

import {
  activistsFetchRequested
} from '../../../actions/activists';

class ActivistList extends Component {

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
    this.props.dispatch(activistsFetchRequested(this.props.region.selectedState, city));
  }

  render() {
    var activists = null;
    if (this.props.activists && this.props.activists.activists) {
      activists = this.props.activists.activists.Items.map((ele, index) => (
        <ActivistBlock key={ index } activist={ ele } />
      ));
    }

    return (
      <div>
        <CategorySelector states={ this.props.region.states } cities={ this.props.region.cities }
          selectState={ this.selectState.bind(this) }  selectCity={ this.selectCity.bind(this) } />

        { (activists && activists.length) ?
          (
            <div>
              <h6 className='ml-2' > Select an activism page from the list below </h6>
              <ul className='list-group media-list media-list-stream mb-5' >
                { activists }
              </ul>
            </div>
          ) : (
            <h6 className='ml-2' > Sorry, there are no activists to show. </h6>
          )
        }
      </div>
    )
  }

}

ActivistList.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    region: store.region,
    activists: store.activists
  };
}

export default connect(mapStateToProps)(ActivistList);
