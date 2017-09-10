import Types from './types'

// Get State List
export const statesFetchRequested = (includeAdmin = false) =>
  ({ type: Types.STATES_FETCH_REQUESTED, includeAdmin })

export const statesFetchSucceeded = (states) =>
  ({ type: Types.STATES_FETCH_SUCCEEDED, states: states })

export const statesFetchFailed = (err) =>
  ({ type: Types.STATES_FETCH_FAILED, err: err })

// Get City List
export const citiesFetchRequested = (state) =>
  ({ type: Types.CITIES_FETCH_REQUESTED, state: state })

export const citiesFetchSucceeded = (cities) =>
  ({ type: Types.CITIES_FETCH_SUCCEEDED, cities: cities })

export const citiesFetchFailed = (err) =>
  ({ type: Types.CITIES_FETCH_FAILED, err: err })

// Get Department List
export const departmentsFetchRequested = (state, city) =>
  ({ type: Types.DEPARTMENTS_FETCH_REQUESTED, state: state, city: city })

export const departmentsFetchSucceeded = (departments) =>
  ({ type: Types.DEPARTMENTS_FETCH_SUCCEEDED, departments: departments })

export const departmentsFetchFailed = (err) =>
  ({ type: Types.DEPARTMENTS_FETCH_FAILED, err: err })

// Category Selector
export const selectState = (state) =>
  ({ type: Types.SELECT_STATE, state: state })

export const selectCity = (city) =>
  ({ type: Types.SELECT_CITY, city: city })

export const selectDepartment = (department) =>
  ({ type: Types.SELECT_DEPARTMENT, department: department })
