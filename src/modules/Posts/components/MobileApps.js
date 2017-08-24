import React from 'react'

// Import Assets
import AppleImage from '../../../assets/apple-app-store-app.png'
import AndroidImage from '../../../assets/google-play-store-app.png'

export default function MobileApps(props) {
  return (
    <div className="card visible-md-block visible-lg-block mb-4">
      <div className="card-block">
        <h6 className="mb-3">Download Our Mobile Apps!</h6>
        <p>To download our mobile apps to your iOS or Android devices, please click on the links below.</p>
        <p className="apple">
          <a href="https://itunes.apple.com/us/app/reformcow/id1099270567">
            <img src={AppleImage} alt="Download on the App Store" className="postsview_img"></img>
          </a>
        </p>
        <p className="android">
          <a href="https://play.google.com/store/apps/details?id=com.reformcow.android">
            <img src={AndroidImage} alt="Download on Google Play" className="postsview_img"></img>
          </a>
        </p>
      </div>
    </div>
  )
}
