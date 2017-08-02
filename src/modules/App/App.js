import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className='app'>
        It works
      </div>
    )
  }
}

App.propTypes = {

};

// Retrieve data from store as props
function mapStateToProps(state) {

}

export default connect(mapStateToProps)(App);
