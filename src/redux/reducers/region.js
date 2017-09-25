import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {
  selectedState: '',
  selectedCity: '',
  selectedDepartment: ''
}

// Handlers

export const fetchStatesSucceeded = (state = initialState, action) => {
  return { ...state, states: action.states, cities: null, departments: null }
}

export const fetchStatesFailed = (state = initialState, action) => {
  return { ...state, err: action.err }
}

export const fetchCitiesSucceeded = (state = initialState, action) => {
  return { ...state, cities: action.cities, departments: null }
}

export const fetchCitiesFailed = (state = initialState, action) => {
  return { ...state, err: action.err }
}

export const fetchDepartmentsSucceeded = (state = initialState, action) => {
  return { ...state, departments: action.departments }
}

export const fetchDepartmentsFailed = (state = initialState, action) => {
  return { ...state, err: action.err }
}

export const selectState = (state = initialState, action) => {
  return { ...state, selectedState: action.state }
}

export const selectCity = (state = initialState, action) => {
  return { ...state, selectedCity: action.city, departments: null }
}

export const selectDepartment = (state = initialState, action) => {
  return { ...state, selectedDepartment: action.department }
}

// map action types to reducer functions
export const handlers = {
  [Types.STATES_FETCH_SUCCEEDED]: fetchStatesSucceeded,
  [Types.STATES_FETCH_FAILED]: fetchStatesFailed,
  [Types.CITIES_FETCH_SUCCEEDED]: fetchCitiesSucceeded,
  [Types.CITIES_FETCH_FAILED]: fetchCitiesFailed,
  [Types.DEPARTMENTS_FETCH_SUCCEEDED]: fetchDepartmentsSucceeded,
  [Types.DEPARTMENTS_FETCH_FAILED]: fetchDepartmentsFailed,
  [Types.SELECT_STATE]: selectState,
  [Types.SELECT_CITY]: selectCity,
  [Types.SELECT_DEPARTMENT]: selectDepartment
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
