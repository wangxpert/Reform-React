import React from 'react';

export default function DepartmentBanner(props) {
  return (
    <ul className="list-group media-list media-list-stream mb-4">
      <li className="media postsview_banner" id="categoryBannerDiv">
        <div id="department-banner" className="postsview_department-banner">
          { props.banner ? (
            <img className="postsview_img" src={`https://${props.banner}`} width="100%" />
          ) : (
            <img className="postsview_img" src="https://s3.amazonaws.com/media-reformcow-com/banner_1489159906549_20170310t153139.616z"></img>
          ) }
        </div>
      </li>
   </ul>
  )
}
