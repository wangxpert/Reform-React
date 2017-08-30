import Types from './types'

// Upload Image
export const uploadImageRequested = (file) =>
  ({ type: Types.UPLOAD_IMAGE_REQUESTED, file })

export const uploadImageSucceeded = (uploaded) =>
  ({ type: Types.UPLOAD_IMAGE_SUCCEEDED, uploaded })

export const uploadImageFailed = (file, err) =>
  ({ type: Types.UPLOAD_IMAGE_FAILED, err: err, file: file })

// Delete Image
export const deleteImageRequested = (file) =>
  ({ type: Types.DELETE_IMAGE_REQUESTED, file })

export const deleteImageSucceeded = (file) =>
  ({ type: Types.DELETE_IMAGE_SUCCEEDED, file })

export const deleteImageFailed = (err) =>
  ({ type: Types.DELETE_IMAGE_FAILED, err: err })

// Create Activism PageManage
export const createActivismPageReuested = (info, idToken) =>
  ({ type: Types.CREATE_ACTIVISM_PAGE_REQUESTED, info, idToken })

export const createActivismPageSucceeded = (result) =>
  ({ type: Types.CREATE_ACTIVISM_PAGE_SUCCEEDED, result })

export const createActivismPageFailed = (err) =>
  ({ type: Types.CREATE_ACTIVISM_PAGE_FAILED, err: err })
