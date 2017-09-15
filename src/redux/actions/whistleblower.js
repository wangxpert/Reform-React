import Types from './types'

// Advertise Inquiry
export const blowWhistleRequested = (data) =>
  ({ type: Types.BLOW_WHISTLE_REQUESTED, data })

export const blowWhistleSucceeded = (result) =>
  ({ type: Types.BLOW_WHISTLE_SUCCEEDED, result })

export const blowWhistleFailed = (err) =>
  ({ type: Types.BLOW_WHISTLE_FAILED, err })
