import Types from './types'

// Get City Officials
export const getCityOfficialsRequested = (state, city) =>
  ({ type: Types.GET_CITY_OFFICIALS_REQUESTED, state, city })

export const getCityOfficialsSucceeded = (result) =>
  ({ type: Types.GET_CITY_OFFICIALS_SUCCEEDED, result })

export const getCityOfficialsFailed = (err) =>
  ({ type: Types.GET_CITY_OFFICIALS_FAILED, err })
