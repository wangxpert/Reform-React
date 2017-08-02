/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Main from './modules/App/App';

// Base stylesheet
require('./base.css');

export default function App(props) {
  return (
    <Provider store={props.store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
