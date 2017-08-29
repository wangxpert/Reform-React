import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

const AsyncActivistList = asyncComponent(() => import('./components/ActivistList'))
const AsyncActivist = asyncComponent(() => import('./components/Activist'))
const AsyncManageActivism = asyncComponent(() => import('./PageManage'))

const routes = (
  <Switch>
    <Route exact path='/activists' component={ AsyncActivistList } />
    <Route path='/activists/create' component={ AsyncManageActivism } />
    <Route path='/activists/pages/:activist' component={ AsyncActivist } />
  </Switch>
)

export default routes
