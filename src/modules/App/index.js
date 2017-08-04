import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import styles
import './styles/styles.css';

// Import components
import DevTools from './components/DevTools';
import Header from './components/Header';
import Footer from './components/Footer';


// Import routes
import routes from './routes';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    return (
      <div>
        { this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && DevTools }

        <Header />
        
        <div className='container pt-5 mb-5'>
          { routes }
        </div>

        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {

  };
}

export default connect(mapStateToProps)(App);
