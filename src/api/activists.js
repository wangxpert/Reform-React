import callApi from '../utils/apiCaller';

export function fetchActivists(state, city) {
  return callApi(`states/${state}/cities/${city}/activism`);
}

export function fetchActivist(state, city, activist) {
  return callApi(`states/${state}/cities/${city}/activism/${activist}`);
}
