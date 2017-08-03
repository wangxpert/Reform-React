import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { statesFetchRequested } from '../../actions/region';

// Import styles
import './styles/styles.css';

// Import components

// Import routes

class Post extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(statesFetchRequested());
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

Post.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    region: store.region
  };
}

export default connect(mapStateToProps)(Post);
