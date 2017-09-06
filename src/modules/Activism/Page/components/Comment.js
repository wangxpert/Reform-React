import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Comment extends Component {

  render() {
    return (
      <div className={ `comment ${ this.props.className } my-3 mx-3 pt-3` }>
        <div className="media pt-3 ml-3">
          <div className="media-left mx-3">
            <img src={ `https://${ page.images[0] }` } className="media-object img-thumbnail avatar" alt="User Avatar"/>
          </div>
          <div className="media-body">
            <div className="media-heading user-name"><strong>{ 'User' }</strong></div>

            <span>{ '2018 / 1 / 3' }</span>
          </div>

        </div>

        <div className="px-4 pt-3 pb-1">
          <p className="">{ 'abcde asdkjsdfl; ;asflsdljdsfljk ldsfldfasljk;dafsljasdf asdf asdf asdf asdf asdf asdfasdfsdfasdfasdfasdfddfdfdfasd asd fdas' }</p>
          <div className="p-3 row">
            <button className="btn btn-secondary post-button col"><i className="fa fa-thumbs-up" aria-hidden="true"></i>

              { this.props === 'UPVOTING_POST'
                ? <Circle size={ 15 } color='black' style={{ display: 'inline-block', padding: '0', margin: '0 0 0 1rem', height: 'auto' }}/>
                : '  Support'
              }
            </button>
            <button className="btn btn-secondary post-button col"><i className="fa fa-thumbs-down" aria-hidden="true"></i>&nbsp;&nbsp;{ '111' } { "Don't Support" }</button>
            <button className="btn btn-secondary post-button col"><i className="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;{ '222' } Comments</button>
            <button className="btn btn-secondary post-button col"><i className="fa fa-user-times" aria-hidden="true"></i>&nbsp;&nbsp;Report</button>
          </div>
        </div>
      </div>
    )
  }
}
