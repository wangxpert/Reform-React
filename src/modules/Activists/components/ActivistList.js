import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';

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
  resetActivists,
  activistsFetchRequested
} from '../../../actions/activists';


const FETCH_LIMIT = 50;
class ActivistList extends Component {

  componentWillMount() {
    const { dispatch, region } = this.props;
    if (!region.states) dispatch(statesFetchRequested());
  }

  selectState(state) {
    this.props.dispatch(selectState(state));
    this.props.dispatch(citiesFetchRequested(state));
  }

  selectCity(city) {
    const { dispatch, region } = this.props;

    dispatch(selectCity(city));
    dispatch(resetActivists());
    dispatch(activistsFetchRequested(region.selectedState, city, FETCH_LIMIT));
  }

  loadActivists() {
    const { region, activists, dispatch } = this.props;

    dispatch(activistsFetchRequested(region.selectedState, region.selectedCity, FETCH_LIMIT, activists.lastKey))
  }

  render() {
    const { region, activists } = this.props;
    var renderActivists = null;
    if (activists.activists) {
      renderActivists = activists.activists.map((ele, index) => (
        <ActivistBlock key={ index } activist={ ele } />
      ));
    }

    return (
      <div>
        <CategorySelector states={ region.states } cities={ region.cities }
          selectedState={ region.selectedState } selectedCity={ region.selectedCity }
          selectState={ this.selectState.bind(this) }  selectCity={ this.selectCity.bind(this) } />

        { (activists.activists && activists.activists.length) ?
          (
            <div>
              <h6 className='ml-2' > Select an activism page from the list below </h6>
              <ul className='list-group media-list media-list-stream mb-5' >
                <InfiniteScroll
                    pageStart={ 0 }
                    loadMore={ this.loadActivists.bind(this) }
                    hasMore={ activists.lastKey !== undefined }
                    loader={ <div className="loader">Loading ...</div> }
                >
                  { renderActivists }
                </InfiniteScroll>

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
