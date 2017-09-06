import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

const AsyncActivistList = asyncComponent(() => import('./Pages'))
const AsyncView = asyncComponent(() => import('./Page'))
const AsyncCreate = asyncComponent(() => import('./Create'))

const Activism = (props) => {

  return (
    <Switch path='/activism'>
      <Route exact path='/activism/pages' component={ AsyncActivistList } />
      <Route path='/activism/pages/:pageId' component={ AsyncView } />
      <Route path='/activism/create' component={ AsyncCreate } />
      <Redirect exact path='/activism' to='/activism/pages' />
    </Switch>
  )
}

export default Activism
