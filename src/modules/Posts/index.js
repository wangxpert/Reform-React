import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  statesFetchRequested,
  citiesFetchRequested,
  departmentsFetchRequested,
  selectState,
  selectCity,
  selectDepartment
} from '../../actions/region'

import {
  resetPosts,
  postsFetchRequested,
  upvotePostRequested
} from '../../actions/posts'

// Import styles
import './styles/styles.css'

// Import components
import CategorySelector from './components/CategorySelector'
// import DepartmentBanner from './components/DepartmentBanner'
import PostBlock from './components/PostBlock'

import InfiniteScroll from 'react-infinite-scroller'
import { NotificationManager } from 'react-notifications'

// Import routes

const FETCH_LIMIT = 50
class Posts extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentWillMount() {
    const { dispatch, region } = this.props
    if (!region.states) dispatch(statesFetchRequested())
  }

  selectState(state) {
    this.props.dispatch(selectState(state))
    this.props.dispatch(citiesFetchRequested(state))
  }

  selectCity(city) {
    this.props.dispatch(selectCity(city))
    this.props.dispatch(departmentsFetchRequested(this.props.region.selectedState, city))
  }

  selectDepartment(departmentId) {
    const { region, dispatch } = this.props

    const depart = this.props.region.departments.Items.find( ele => ( ele.department === departmentId ) )
    this.setState({ department: depart })

    dispatch(selectDepartment(departmentId))

    dispatch(resetPosts())
    dispatch(postsFetchRequested(region.selectedState, region.selectedCity, departmentId, FETCH_LIMIT))
  }

  loadPosts() {
    const { region, posts } = this.props

    if (posts.state === 'FETCHING_POSTS')
      return

    this.props.dispatch(postsFetchRequested(region.selectedState, region.selectedCity, region.selectedDepartment, FETCH_LIMIT, posts.lastKey))
  }

  onUpvote(post) {
    const { auth, posts, dispatch } = this.props

    if (auth.state === 'LOGGED') {
      if (posts.state !== 'UPVOTING_POST')
      dispatch(upvotePostRequested(post.state, post.city, post.department, post.post, auth.session.idToken.jwtToken))
    } else {
      NotificationManager.warning('You have to login to upvote.', 'Not permitted')
    }
  }

  render() {
    const { region, posts } = this.props

    var renderPosts = []
    if (this.props.posts && this.props.posts.posts) {
      renderPosts = this.props.posts.posts.map((ele, index) => (
        <PostBlock key={ index } post={ ele } state={ posts.state } onUpvote={ this.onUpvote.bind(this) } />
      ))
    }

    return (
      <div className="posts">
        <CategorySelector states={ region.states } cities={ region.cities } departments={ region.departments }
          selectedState={ region.selectedState } selectedCity={ region.selectedCity } selectedDepartment = { region.selectedDepartment }
          selectState={ this.selectState.bind(this) }  selectCity={ this.selectCity.bind(this) } selectDepartment={ this.selectDepartment.bind(this) } />

        { /* <DepartmentBanner banner = { this.state.department ? this.state.department.banner : null }/> */ }

        {/* Department Posts */}
        <ul className="col px-auto">
          { (posts.posts && posts.posts.length) ?
            (
              <InfiniteScroll
                  pageStart={ 0 }
                  loadMore={ this.loadPosts.bind(this) }
                  hasMore={ posts.lastKey !== undefined }
                  loader={ <div className="loader">Loading ...</div> }
                  useWindow={ true }
              >
                { renderPosts }
              </InfiniteScroll>
            ) : (
              <h6 className='ml-2' > Sorry, there are no posts yet for this category. </h6>
            )
          }
        </ul>
      </div>
    )
  }
}

Posts.propTypes = {
  dispatch: PropTypes.func.isRequired
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    region: store.region,
    posts: store.posts,
    auth: store.auth
  }
}

export default connect(mapStateToProps)(Posts)
