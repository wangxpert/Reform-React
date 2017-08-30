import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

const AsyncManageActivism = asyncComponent(() => import('./PageManage'))

const routes = (
  <Switch path='/activism'>
    <Route path='/activism/create' component={ AsyncManageActivism } />
  </Switch>
)

export default routes
