import React from 'react'

export default function AlertBox(props) {
  return (
    <div className="alert alert-warning alert-dismissible hidden-md-down mb-4 alert-beta" role="alert">
      <button type="button" className="close" onClick={ props.closeAlert } data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
      <a className="alert-link" href="">Beta!</a> ReformCOW is still in beta release. If you encounter any errors or have suggestions for making it better, please <a href="" data-toggle="modal" data-target="#feedbackModal">let us know!</a>
    </div>
  )
}
