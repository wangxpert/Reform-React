/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import { routerReducer as router } from 'react-router-redux';

import region from './region';
import posts from './posts';
import activists from './activists';
import auth from './auth';

// Combine all reducers into one root reducer
export default combineReducers({
  router,
  region,
  posts,
  activists,
  auth
});
