import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {
  state: '',
  images: []
}

/* Handlers */

// Upload Image
export const uploadImageRequested = (state = initialState, action) => {
  return { ...state, state: 'UPLOADING_IMAGE', file: action.file }
}

export const uploadImageSucceeded = (state = initialState, action) => {
  const images = state.images.slice()
  images.push(action.uploaded)
  return { ...state, state: 'UPLOAD_IMAGE_SUCCEEDED', images: images }
}

export const uploadImageFailed = (state = initialState, action) => {
  return { ...state, state: 'UPLOAD_IMAGE_FAILED', err: action.err, file: action.file }
}

// Delete Image
export const deleteImageRequested = (state = initialState, action) => {
  return { ...state, state: 'DELETING_IMAGE', file: action.file }
}

export const deleteImageSucceeded = (state = initialState, action) => {
  const index = state.images.findIndex(e => (e === action.file))
  const images = state.images.slice()
  images.splice(index, 1)
  return { ...state, state: 'DELETE_IMAGE_SUCCEEDED', images: images }
}

export const deleteImageFailed = (state = initialState, action) => {
  return { ...state, state: 'DELETE_IMAGE_FAILED', err: action.err }
}

// Create Activism Page
export const createActivismPageReuested = (state = initialState, action) => {
  return { ...state, state: 'CREATING_ACTIVISM_PAGE' }
}

export const createActivismPageSucceeded = (state = initialState, action) => {
  return { ...state, state: 'CREATE_ACTIVISM_PAGE_SUCCEEDED', result: action.result }
}

export const createActivismPageFailed = (state = initialState, action) => {
  return { ...state, state: 'CREATE_ACTIVISM_PAGE_FAILED', err: action.err }
}

// map action types to reducer functions
export const handlers = {
  [Types.UPLOAD_IMAGE_REQUESTED]: uploadImageRequested,
  [Types.UPLOAD_IMAGE_SUCCEEDED]: uploadImageSucceeded,
  [Types.UPLOAD_IMAGE_FAILED]: uploadImageFailed,

  [Types.DELETE_IMAGE_REQUESTED]: deleteImageRequested,
  [Types.DELETE_IMAGE_SUCCEEDED]: deleteImageSucceeded,
  [Types.DELETE_IMAGE_FAILED]: deleteImageFailed,

  [Types.CREATE_ACTIVISM_PAGE_REQUESTED]: createActivismPageReuested,
  [Types.CREATE_ACTIVISM_PAGE_SUCCEEDED]: createActivismPageSucceeded,
  [Types.CREATE_ACTIVISM_PAGE_FAILED]: createActivismPageFailed
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
