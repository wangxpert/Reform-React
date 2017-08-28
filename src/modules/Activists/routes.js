import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

const AsyncActivistList = asyncComponent(() => import('./components/ActivistList'))
const AsyncActivist = asyncComponent(() => import('./components/Activist'))

const routes = (
  <Switch>
    <Route exact path='/activists' component={ AsyncActivistList } />
    <Route path='/activists/:activist' component={ AsyncActivist } />
  </Switch>
)

export default routes
