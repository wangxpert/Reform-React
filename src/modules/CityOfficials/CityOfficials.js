import React, { Component } from 'react'

// Import Components

import Official from './components/Official'
import RegionSelector from './components/RegionSelector'

class CityOfficials extends Component {

  constructor(props) {
    super(props)

    this.selectState = this.selectState.bind(this)
    this.selectCity = this.selectCity.bind(this)
  }

  componentWillMount() {
    const { region } = this.props

    if (!region.states)
      this.props.getStates(true)
  }

  selectState(state) {
    this.props.selectState(state)
    this.props.getCities(state)
  }

  selectCity(city) {
    this.props.selectCity(city)

    this.props.getOfficials(this.props.region.selectedState, city)
  }

  render() {

    const { officials, region } = this.props


    let renderOfficials = null
    if (officials && officials.Items) {
      renderOfficials = officials.Items.map((e, index) => (
        <Official key={ index } official={ e } />
      ))
    }

    return (
      <div className="officials mt-5 mb-5">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="mt-4 page-title">City Officials</h2>
          </div>
          <hr />
          <div className="col-12">
            <RegionSelector  states={ region.states } cities={ region.cities }
              selectedState={ region.selectedState } selectedCity={ region.selectedCity }
              selectState={ this.selectState } selectCity={ this.selectCity } />
          </div>

          <div className="col px-auto">
            { officials && officials.Items && officials.Count ?
              renderOfficials :
              <h6 className='ml-5' > We do not have the list of officials for this city yet. </h6>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default CityOfficials
