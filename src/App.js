/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Core from './modules/App';

// Base stylesheet
import 'font-awesome/css/font-awesome.css'
import './styles/styles.css';

export default function App(props) {
  return (
    <Provider store={props.store}>
      <BrowserRouter>
        <Route path="/" component={Core} />
      </BrowserRouter>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
