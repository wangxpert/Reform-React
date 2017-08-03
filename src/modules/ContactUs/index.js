import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import styles
import './styles/styles.css';

// Import components

// Import routes

class ContactUs extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="row page-layout__viewport">
        <div className="col-6 offset-3">
          <h3>Contact Us</h3>
          <p>Contact us text.</p>
        </div>
      </div>
    )
  }
}

export default ContactUs;
