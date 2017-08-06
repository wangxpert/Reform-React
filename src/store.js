/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const middlewares = [
      sagaMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  if (process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : null);
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  // Extensions
  store.runSaga = sagaMiddleware.run;

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
