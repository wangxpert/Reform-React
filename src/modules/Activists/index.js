import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

// Import styles
import '../Posts/styles/styles.css';
import './styles/styles.css';

// Import components
import AlertBox from '../Posts/components/AlertBox';
import MobileApps from '../Posts/components/MobileApps';
import SponsoredAds from '../Posts/components/SponsoredAds';

import ActivistList from './components/ActivistList';
import Activist from './components/Activist';

// Import routes

class Activists extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showAlert: true
    }
  }

  render() {

    return (
      <div className='row page-layout__viewport'>
        <div className="col-3">
          { this.state.showAlert && <AlertBox closeAlert={e => (this.setState({ showAlert: false }))} /> }
          <MobileApps />
        </div>

        <div className="col-6">

          {/* Activism Pages List */}
          <Switch>
            <Route exact path='/activists/' component={ ActivistList } />
            <Route path='/activists/:state/:city/:activist' component={ Activist } />
          </Switch>
          { /*<ActivistList activists={this.props.activists} />*/ }

        </div>

        <div className="col-3">
          <SponsoredAds />
        </div>

      </div>
    );
  }
}

export default Activists;
