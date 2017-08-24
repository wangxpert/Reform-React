import React from 'react'

export default function SponsoredAds(props) {
  return (
    <div className="card mb-4 hidden-md-down">
      <div className="card-block">
        <h6>Sponsored</h6>
        <div data-grid="images" data-target-height="150">
          <a href="https://www.reformcow.com/tx/austin/activismF3ZEGCCQY" target="_blank" rel="noopener noreferrer" className="jollyville-squeeze-ad">
            <img alt="" className="media-object" data-width="640" src="https://media-reformcow-com.s3.amazonaws.com/texas-austin-s1n0um1sx-SyucjEyie-1489091469829802979.jpg" />
          </a>
        </div>
        <a href="https://www.reformcow.com/tx/austin/activismF3ZEGCCQY" target="_blank" rel="noopener noreferrer" className="alert-link">Jollyville Squeeze</a>
        <p>Please help us stop the efforts of the proposed removal of two lanes on Jollyville Road.  The effort is driven by the Toll road advocates that want to sacrifice Jollyville automobile mobility in order to obtain federal funding for the toll road.</p>
      </div>
    </div>
  )
}
