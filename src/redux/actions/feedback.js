import Types from './types'

// Submit Feedback
export const submitFeedbackRequested = (data) =>
  ({ type: Types.SUBMIT_FEEDBACK_REQUESTED, data })

export const submitFeedbackSucceeded = (result) =>
  ({ type: Types.SUBMIT_FEEDBACK_SUCCEEDED, result })

export const submitFeedbackFailed = (err) =>
  ({ type: Types.SUBMIT_FEEDBACK_FAILED, err })
