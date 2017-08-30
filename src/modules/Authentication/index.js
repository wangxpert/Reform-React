import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, Route } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

const AsyncLogin = asyncComponent(() => import('./Login'))
const AsyncSignUp = asyncComponent(() => import('./SignUp'))
const AsyncConfirmUser = asyncComponent(() => import('./SignUp/ConfirmUser'))
const AsyncResetPassword = asyncComponent(() => import('./ResetPassword'))
const AsyncConfirmPassword = asyncComponent(() => import('./ResetPassword/ConfirmPassword'))

const Authentication = (props) => {

  if (props.auth.state === 'LOGGED') {
    return <Redirect to='/' />
  }

  return (
    <Switch path='/auth'>
      <Route path='/auth/login' component={ AsyncLogin } />
      <Route path='/auth/signup' component={ AsyncSignUp } />
      <Route path='/auth/confirm/:userName' component={ AsyncConfirmUser } />
      <Route path='/password/reset' component={ AsyncResetPassword } />
      <Route path='/password/confirm/:userName' component={ AsyncConfirmPassword } />
    </Switch>
  )
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(Authentication)
