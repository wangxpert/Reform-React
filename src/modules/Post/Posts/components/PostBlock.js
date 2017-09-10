import React from 'react'

import {
  Circle
} from 'better-react-spinkit'

export default function MobileApps(props) {
  const post = props.post
  const spinnerStyle = { display: 'inline-block', padding: '0', margin: '0 0 0 1rem', height: 'auto' }

  return (

    <div className="post my-5 mx-auto pt-3 text-center">
      <div className="media p-3">
        <div className="media-left mx-3">
          <img src={ `https://${ post.picture }` } className="media-object post-avatar" alt="User Avatar" />
        </div>
        <div className="media-body">
          <h5 className="media-heading">{ post.preferred_username }</h5>
          <span>{ `${ post.cityname } / ${ post.departmentname }` }</span>
        </div>
      </div>
      { post.media && <img src={ `https://${ post.media }` } className="post-media" alt="Post Media" /> }
      <div className="px-4 pt-3 pb-1">
        <p className="post-text">{ post.text }</p>
        <div className="p-3 row">
          <button className="btn btn-secondary post-button col" onClick={ e => props.onUpvote(post) }>
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            &nbsp;&nbsp;{ post.upvotes }
            { props.state === 'UPVOTING_POST' && props.currentPost === post.post
              ? <Circle size={ 15 } color='black' style={ spinnerStyle }/>
              : ' Support'
            }
          </button>
          <button className="btn btn-secondary post-button col" onClick={ e => props.onDownvote(post) }>
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            &nbsp;&nbsp;{ post.downvotes }
            { props.state === 'DOWNVOTING_POST' && props.currentPost === post.post
              ? <Circle size={ 15 } color='black' style={ spinnerStyle }/>
              : ' Don\'t Support'
            }
          </button>
          <button className="btn btn-secondary post-button col" onClick={ e => props.onComment(post) }>
            <i className="fa fa-comments" aria-hidden="true"></i>
            &nbsp;&nbsp;{ post.flags }
            { props.state === 'COMMENTING_POST' && props.currentPost === post.post
              ? <Circle size={ 15 } color='black' style={ spinnerStyle }/>
              : ' Comment'
            }
          </button>
          <button className="btn btn-secondary post-button col" onClick={ e => props.onFlag(post) }>
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            &nbsp;&nbsp;{ post.flags }
            { props.state === 'FLAGGING_POST' && props.currentPost === post.post
              ? <Circle size={ 15 } color='black' style={ spinnerStyle }/>
              : ' Report'
            }
          </button>
        </div>
      </div>

    </div>
  )
}
