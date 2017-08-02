// Import Actions
import { ACTION_TEST } from './AppActions';

// Initial State
const initialState = {

};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TEST:
      return {

      };

    default:
      return state;
  }
};

/* Selectors */

// Get state data
export const getStateData = state => state.app.data;

// Export Reducer
export default AppReducer;
