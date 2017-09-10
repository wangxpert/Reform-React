import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

const AsyncPosts = asyncComponent(() => import('./Posts'))
const AsyncCreate = asyncComponent(() => import('./Create'))

const Activism = (props) => {

  return (
    <Switch path='/post'>
      <Route exact path='/post/posts' component={ AsyncPosts } />
      <Redirect exact path='/post' to='/post/posts' />

      { props.auth.state === 'NOT_LOGGED' && <Redirect to='/auth/login' /> }

      <Route path='/post/create' component={ AsyncCreate } />

    </Switch>
  )
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(Activism)
