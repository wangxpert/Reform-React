/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import region from './region';
import posts from './posts';
import activists from './activists';
import auth from './auth';

// Combine all reducers into one root reducer
export default combineReducers({
  region,
  posts,
  activists,
  auth
});
