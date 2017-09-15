/**
 * Root Reducer
 */
import { combineReducers } from 'redux'

// Import Reducers
import { routerReducer as router } from 'react-router-redux'

import region from './region'
import posts from './posts'
import activism from './activism'
import auth from './auth'
import account from './account'
import whistleblower from './whistleblower'
import advertise from './advertise'
import feedback from './feedback'

// Combine all reducers into one root reducer
export default combineReducers({
  router,
  region,
  posts,
  activism,
  auth,
  account,
  whistleblower,
  advertise,
  feedback
})
