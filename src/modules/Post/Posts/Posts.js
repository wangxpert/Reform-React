import React, { Component } from 'react'

// Import components
import InfiniteScroll from 'react-infinite-scroller'
import { NotificationManager } from 'react-notifications'

import PostBlock from './components/PostBlock'
import CategorySelector from './components/CategorySelector'
import TabBar from './components/TabBar'

const FETCH_LIMIT = 50
class Posts extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }

    this.onUpvote = this.onUpvote.bind(this)
    this.onDownvote = this.onDownvote.bind(this)
    this.onFlag = this.onFlag.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  componentDidMount() {
    // const { region } = this.props
    // if (!region.states)
    this.props.statesFetchRequested(true)
  }

  selectState(state) {
    this.props.selectState(state)
    this.props.citiesFetchRequested(state)
  }

  selectCity(city) {
    this.props.selectCity(city)
    this.props.departmentsFetchRequested(this.props.region.selectedState, city)
  }

  selectDepartment(departmentId) {
    const { region } = this.props

    const depart = region.departments.Items.find( ele => ( ele.department === departmentId ) )
    this.setState({ department: depart })

    this.props.selectDepartment(departmentId)

    this.props.resetPosts()
    this.props.postsFetchRequested(region.selectedState, region.selectedCity, departmentId, FETCH_LIMIT)
  }

  loadPosts() {
    const { region, posts } = this.props

    if (posts.state === 'FETCHING_POSTS')
      return

    this.props.postsFetchRequested(region.selectedState, region.selectedCity, region.selectedDepartment, FETCH_LIMIT, posts.lastKey)
  }

  onUpvote(post) {
    const { auth, posts } = this.props

    if (auth.state === 'LOGGED') {
      if (posts.state !== 'UPVOTING_POST')
        this.props.upvotePost(post, auth.session.idToken.jwtToken)
    } else {
      NotificationManager.warning('You have to login to upvote.', 'Not permitted')
    }
  }

  onDownvote(post) {
    const { auth, posts } = this.props

    if (auth.state === 'LOGGED') {
      if (posts.state !== 'DOWNVOTING_POST')
        this.props.downvotePost(post, auth.session.idToken.jwtToken)
    } else {
      NotificationManager.warning('You have to login to downvote.', 'Not permitted')
    }
  }

  onFlag(post) {
    const { auth, posts } = this.props

    if (auth.state === 'LOGGED') {
      if (posts.state !== 'FLAGGING_POST')
        this.props.flagPost(post, auth.session.idToken.jwtToken)
    } else {
      NotificationManager.warning('You have to login to report.', 'Not permitted')
    }
  }

  onEdit(post) {
    this.props.changeLocation(`/post/edit/${ post.postid }`)
  }

  onDelete(post) {
    const { auth, posts } = this.props

    if (posts.state !== 'DELETING_POST')
      this.props.deletePost(post, auth.session.idToken.jwtToken)
  }

  render() {
    const { region, posts, user } = this.props

    var renderPosts = []
    if (this.props.posts && this.props.posts.posts) {
      renderPosts = this.props.posts.posts.map((ele, index) => (
        <PostBlock key={ index } post={ ele } state={ posts.state } currentPost={ posts.currentPost } user={ user }
          onUpvote={ this.onUpvote } onDownvote={ this.onDownvote } onFlag={ this.onFlag } onDelete={ this.onDelete } onEdit={ this.onEdit }/>
      ))
    }

    return (
      <div className="posts mt-5 mb-5">
        <TabBar />
        <CategorySelector states={ region.states } cities={ region.cities } departments={ region.departments }
          selectedState={ region.selectedState } selectedCity={ region.selectedCity } selectedDepartment = { region.selectedDepartment }
          selectState={ this.selectState.bind(this) }  selectCity={ this.selectCity.bind(this) } selectDepartment={ this.selectDepartment.bind(this) } />

        {/* Posts */}
        <div className="col px-auto">
          { (posts.posts && posts.posts.length) ?
            (
              <InfiniteScroll
                pageStart={ 0 }
                loadMore={ this.loadPosts.bind(this) }
                hasMore={ posts.lastKey !== undefined }
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

export default Posts
