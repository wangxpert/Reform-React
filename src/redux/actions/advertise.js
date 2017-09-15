import Types from './types'

// Advertise Inquiry
export const advertiseInquiryRequested = (data) =>
  ({ type: Types.ADVERTISE_INQUIRY_REQUESTED, data })

export const advertiseInquirySucceeded = (result) =>
  ({ type: Types.ADVERTISE_INQUIRY_SUCCEEDED, result })

export const advertiseInquiryFailed = (err) =>
  ({ type: Types.ADVERTISE_INQUIRY_FAILED, err })
