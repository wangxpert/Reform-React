import React from 'react'

import { NotificationManager } from 'react-notifications'

import {
  Circle
} from 'better-react-spinkit'

export default function MobileApps(props) {
  const post = props.post

  function warnAlert() {
    NotificationManager.warning('You must be logged in to perform this function', 'Not permitted')
  }

  return (

    <div className="post my-5 pt-3 mx-auto text-center">
      <div className="media p-3">
        <div className="media-left mx-3">
          <img src={ `https://${ post.picture }` } className="media-object post-avatar" alt="User Avatar" />
        </div>
        <div className="media-body">
          <h5 className="media-heading">{ post.preferred_username }</h5>
          <span>{ `${ post.cityname } / ${ post.departmentname }` }</span>
        </div>
      </div>
      <img src={ `https://${ post.media }` } className="post-media" alt="Post Media" />
      <div className="px-4 pt-3 pb-1">
        <p className="post-text">{ post.text }</p>
        <div className="p-3 row">
          <button className="btn btn-secondary post-button col" onClick={ e => props.onUpvote(post) }><i className="fa fa-thumbs-up" aria-hidden="true"></i>
            &nbsp;&nbsp;{ post.upvotes }
            { props.state === 'UPVOTING_POST'
              ? <Circle size={ 15 } color='black' style={{ display: 'inline-block', padding: '0', margin: '0 0 0 1rem', height: 'auto' }}/>
              : '  Support'
            }
          </button>
          <button className="btn btn-secondary post-button col" onClick={ warnAlert }><i className="fa fa-thumbs-down" aria-hidden="true"></i>&nbsp;&nbsp;{ post.downvotes } { "Don't Support" }</button>
          <button className="btn btn-secondary post-button col" onClick={ warnAlert }><i className="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;{ post.comments } Comments</button>
          <button className="btn btn-secondary post-button col" onClick={ warnAlert }><i className="fa fa-user-times" aria-hidden="true"></i>&nbsp;&nbsp;Report</button>
        </div>
      </div>

    </div>
  )
}

/*
<li className="media list-group-item p-4 mb-3">
  <img className="media-object rounded-circle mr-3 postview_avatar" src={ `https://${ post.picture }` } alt="" />
  <h3>{ post.preferred_username }</h3>
  <div className="postsview_dept" >{ post.cityname }
    { post.departmentname &&
      <span>{ `/ ${ post.departmentname }` }</span>
    }
  </div>
  { post.media &&
    <img className="media-object img-responsive postview_photo mb-2" src={`https://${ post.media }`} alt="" />
  }
  <p>{ post.text }</p>
  <hr width="100%" />
  <div className="text-center mx-auto">
    /<button className="btn btn-secondary mr-3" onClick={ e => props.onUpvote(post) }><i className="fa fa-thumbs-up" aria-hidden="true"></i>
      &nbsp;&nbsp;{ post.upvotes }
      { props.state === 'UPVOTING_POST'
        ? <Circle size={ 15 } color='black' style={{ display: 'inline-block', padding: '0', margin: '0 0 0 1rem', height: 'auto' }}/>
        : '  Support'
      }
    </button>
    <button className="btn btn-secondary mr-3" onClick={ warnAlert }><i className="fa fa-thumbs-down" aria-hidden="true"></i>&nbsp;&nbsp;{ post.downvotes } { "Don't Support" }</button>
    <button className="btn btn-secondary" onClick={ warnAlert }><i className="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;{ post.comments } Comments</button>
  </div>
</li>
*/
