import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

const AsyncActivistList = asyncComponent(() => import('./Pages'))
const AsyncView = asyncComponent(() => import('./Page'))
const AsyncCreate = asyncComponent(() => import('./Create'))
const AsyncEdit = asyncComponent(() => import('./Edit'))

const Activism = (props) => {

  return (
    <Switch path='/activism'>
      <Route exact path='/activism/pages' component={ AsyncActivistList } />
      <Route path='/activism/pages/:pageId' component={ AsyncView } />
      <Redirect exact path='/activism' to='/activism/pages' />

      { props.auth.state === 'NOT_LOGGED' && <Redirect to='/auth/login' /> }

      <Route path='/activism/create' component={ AsyncCreate } />
      <Route path='/activism/update/:pageId' component={ AsyncEdit } />

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
