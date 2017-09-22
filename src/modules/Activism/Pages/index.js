import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import Components
import InfiniteScroll from 'react-infinite-scroller'
import { push } from 'react-router-redux'
import Reveal from 'react-reveal'

import PageBlock from './components/PageBlock'
import CategorySelector from './components/CategorySelector'
import TabBar from '../../Post/Posts/components/TabBar'

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


const FETCH_LIMIT = 50
class ActivistList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      includingStates: true,
      includingCities: true,
    }

    this.fetchList = this.fetchList.bind(this)
  }

  componentWillMount() {
    // const { dispatch, region } = this.props
    // if (!region.states)
    const { dispatch } = this.props
    dispatch(statesFetchRequested(true))
    this.fetchList()
  }

  fetchList() {
    const { dispatch, region } = this.props

    dispatch(resetActivists())
    dispatch(activistsFetchRequested(region.selectedState, region.selectedCity, this.state.includingStates, this.state.includingCities, FETCH_LIMIT))
  }

  selectState(state) {
    this.props.dispatch(selectState(state))
    if (state === '') {
      this.props.dispatch(selectCity(''))
    } else {
      this.props.dispatch(citiesFetchRequested(state))
    }
    setTimeout(this.fetchList)
  }

  selectCity(city) {
    const { dispatch } = this.props

    dispatch(selectCity(city))
    setTimeout(this.fetchList)
  }

  includeStates(including) {
    this.setState({ includingStates: including })
    setTimeout(this.fetchList)
  }

  includeCities(including) {
    this.setState({ includingCities: including })
    setTimeout(this.fetchList)
  }

  loadActivists() {
    const { region, activism, dispatch } = this.props

    dispatch(activistsFetchRequested(region.selectedState, region.selectedCity, this.state.includingStates, this.state.includingCities, FETCH_LIMIT, activism.lastKey))
  }

  render() {
    const { region, activism } = this.props
    var renderActivists = null
    if (activism.activists) {
      renderActivists = activism.activists.map((ele, index) => (
        <Reveal key={ index } effect="animated fadeInUp">
          <PageBlock key={ index } activist={ ele } onClick={ e => this.props.dispatch(push( `/activism/pages/${ ele.id }` )) } />
        </Reveal>
      ))
    }

    return (
      <div className="activism-pages mt-5 mb-5">
        <TabBar />
        <CategorySelector states={ region.states } cities={ region.cities }
          selectedState={ region.selectedState } selectedCity={ region.selectedCity }
          selectState={ this.selectState.bind(this) }  selectCity={ this.selectCity.bind(this) }
          includeStates={ this.includeStates.bind(this) } includeCities={ this.includeCities.bind(this) } />

        {/* Pages */}
        <div className="col px-auto">
          { (activism.activists && activism.activists.length) ?
            (
              <div className="px-auto px-md-2">
                <h6 className='ml-2' > Select an activism page from the list below </h6>
                <InfiniteScroll
                  pageStart={ 0 }
                  loadMore={ this.loadActivists.bind(this) }
                  hasMore={ activism.lastKey !== undefined }
                  loader={ <div className="loader">Loading ...</div> } >
                  { renderActivists }
                </InfiniteScroll>
              </div>
            ) : (
              <h6 className='ml-2' > Sorry, there are no activist pages to show. </h6>
            )
          }
        </div>

      </div>
    )
  }

}

ActivistList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    region: state.region,
    activism: state.activism
  }
}

export default connect(mapStateToProps)(ActivistList)
