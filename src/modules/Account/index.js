import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, Route } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

const AsyncProfile = asyncComponent(() => import('./Profile'))

const Account = (props) => {

  if (props.auth.state === 'NOT_LOGGED') {
    return <Redirect to='/auth/login' />
  }

  return (
    <Switch path='/account'>
      <Route path='/account/profile' component={ AsyncProfile } />
    </Switch>
  )
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(Account)
