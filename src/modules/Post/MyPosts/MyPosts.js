import React, { Component } from 'react'

// Import components
import InfiniteScroll from 'react-infinite-scroller'

import PostBlock from '../Posts/components/PostBlock'

const FETCH_LIMIT = 50
class MyPosts extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }

    this.onUpvote = this.onUpvote.bind(this)
    this.onDownvote = this.onDownvote.bind(this)
    this.onFlag = this.onFlag.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onPost = this.onPost.bind(this)
  }

  componentWillMount() {
    const idToken = this.props.session.idToken.jwtToken

    this.props.resetMyPosts()
    this.props.getMyPosts(FETCH_LIMIT, null, idToken)
    console.log('MYPOSTS')
  }

  loadPosts() {
    if (this.props.state === 'GETTING_MYPOSTS')
      return

    const idToken = this.props.session.idToken.jwtToken

    this.props.getMyPosts(FETCH_LIMIT, this.props.myPosts.lastKey, idToken)
  }

  onUpvote(post) {
    if (this.props.state !== 'UPVOTING_POST') {
      this.props.upvotePost(post, this.props.session.idToken.jwtToken)
    }
  }

  onDownvote(post) {
    if (this.props.state !== 'DOWNVOTING_POST') {
      this.props.downvotePost(post, this.props.session.idToken.jwtToken)
    }
  }

  onFlag(post) {
    if (this.props.state !== 'FLAGGING_POST') {
      this.props.flagPost(post, this.props.session.idToken.jwtToken)
    }
  }

  onEdit(post) {
    this.props.changeLocation(`/post/edit/${ post.postid }`)
  }

  onDelete(post) {
    if (this.props.state !== 'DELETING_POST')
      this.props.deletePost(post, this.props.session.idToken.jwtToken)
  }

  onPost(post) {
    this.props.changeLocation(`/post/posts/${ post.postid }`)
  }

  render() {

    const { posts, lastKey } = this.props.myPosts

    var renderPosts = []
    if (posts) {
      renderPosts = posts.map((ele, index) => (
        <PostBlock key={ index } post={ ele } state={ this.props.state } currentPost={ this.props.currentPost } user={ this.props.user }
          onUpvote={ this.onUpvote } onDownvote={ this.onDownvote } onFlag={ this.onFlag } onDelete={ this.onDelete } onEdit={ this.onEdit } onPost={ this.onPost }/>
      ))
    }


    return (
      <div className="posts mt-5 mb-5">
        <h2 className="ml-3 mt-2 p-3">My Posts</h2>
        {/* Posts */}
        <div className="col px-auto">
          { (posts && posts.length) ?
            (
              <InfiniteScroll
                pageStart={ 0 }
                loadMore={ this.loadPosts.bind(this) }
                hasMore={ lastKey !== undefined }
                loader={ <div className="loader">Loading ...</div> }
                useWindow={ true } >
                { renderPosts }
              </InfiniteScroll>
            ) : (
              <h6 className='ml-2' > Sorry, there are no posts yet for this category. </h6>
            )
          }
        </div>
      </div>
    )
  }
}

export default MyPosts
