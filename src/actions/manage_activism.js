import Types from './types'

// Create Activism PageManage
export const createActivismPageReuested = (info, idToken) =>
  ({ type: Types.CREATE_ACTIVISM_PAGE_REQUESTED, info, idToken })

export const createActivismPageSucceeded = (result) =>
  ({ type: Types.CREATE_ACTIVISM_PAGE_SUCCEEDED, result })

export const createActivismPageFailed = (err) =>
  ({ type: Types.CREATE_ACTIVISM_PAGE_FAILED, err })
