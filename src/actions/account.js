import Types from './types'

//Reset store
export const resetAccount = () =>
  ({ type: Types.RESET_ACCOUNT })

// Get User Information
export const getUserInformationRequested = () =>
  ({ type: Types.GET_USER_INFORMATION_REQUESTED })

export const getUserInformationSucceeded = (user) =>
  ({ type: Types.GET_USER_INFORMATION_SUCCEEDED, user: user })

export const getUserInformationFailed = (err) =>
  ({ type: Types.GET_USER_INFORMATION_FAILED, err: err })

// Upload Avatar
export const uploadAvatarRequested = (file) =>
  ({ type: Types.UPLOAD_AVATAR_REQUESTED, file: file })

export const uploadAvatarSucceeded = (result) =>
  ({ type: Types.UPLOAD_AVATAR_SUCCEEDED, result })

export const uploadAvatarFailed = (err) =>
  ({ type: Types.UPLOAD_AVATAR_FAILED, err })

// Update User Information
export const updateUserInformationRequested = (info) =>
  ({ type: Types.UPDATE_USER_INFORMATION_REQUESTED, info })

export const updateUserInformationSucceeded = (result) =>
  ({ type: Types.UPDATE_USER_INFORMATION_SUCCEEDED, result })

export const updateUserInformationFailed = (err) =>
  ({ type: Types.UPDATE_USER_INFORMATION_FAILED, err })
