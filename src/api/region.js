import callApi from '../utils/apiCaller';

export function fetchStates() {
  return callApi('states');
}
