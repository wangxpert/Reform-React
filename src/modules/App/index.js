import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import styles
import './styles/styles.css';

// Import components
import { NotificationContainer } from 'react-notifications';


import Header from './components/Header';
import Footer from './components/Footer';


// Import routes
import routes from './routes';

// Import Actions
import { getSessionRequested } from '../../actions/auth';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getSessionRequested());
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <Header />

        <div className='container pt-5 mb-5'>
          <NotificationContainer />
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
