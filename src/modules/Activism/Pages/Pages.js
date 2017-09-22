import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Components
import InfiniteScroll from 'react-infinite-scroller'
import Reveal from 'react-reveal'

import PageBlock from './components/PageBlock'
import CategorySelector from './components/CategorySelector'
import TabBar from '../../Post/Posts/components/TabBar'

const FETCH_LIMIT = 50
class ActivistList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      includingStates: false,
      includingCities: false,
    }

    this.fetchList = this.fetchList.bind(this)
  }

  componentWillMount() {
    const { region } = this.props
    if (!region.states)
      this.props.statesFetchRequested()

  }

  fetchList() {
    const { region } = this.props

    this.props.resetActivists()
    this.props.activistsFetchRequested(region.selectedState, region.selectedCity, this.state.includingStates, this.state.includingCities, FETCH_LIMIT)
  }

  selectState(state) {
    this.props.selectState(state)
    if (state === '') {
      this.props.selectCity('')
    } else {
      this.props.citiesFetchRequested(state)
    }
    setTimeout(this.fetchList)
  }

  selectCity(city) {
    this.props.selectCity(city)
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
    const { region, activism } = this.props

    this.props.activistsFetchRequested(region.selectedState, region.selectedCity, this.state.includingStates, this.state.includingCities, FETCH_LIMIT, activism.lastKey)
  }

  render() {
    const { region, activism, user } = this.props
    var renderActivists = null
    if (activism.activists) {
      renderActivists = activism.activists.map((ele, index) => (
        <Reveal key={ index } effect="animated fadeInUp">
          <PageBlock key={ index } activist={ ele } onClick={ e => this.props.changeLocation( `/activism/pages/${ ele.id }` ) } />
        </Reveal>
      ))
    }

    var defaultState = 'texas'
    var defaultCity = 'austin'

    if (user && user['custom:stateid']) defaultState = user['custom:stateid']
    if (user && user['custom:city']) defaultCity = user['custom:city']

    return (
      <div className="activism-pages mt-5 mb-5">
        <TabBar />
        <CategorySelector states={ region.states } cities={ region.cities }
          defaultState={ defaultState } defaultCity={ defaultCity }
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

export default ActivistList
