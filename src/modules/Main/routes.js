import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

const AsyncPosts = asyncComponent(() => import('../Posts'))
const AsyncActivists = asyncComponent(() => import('../Activists'))

const routes = (
  <Switch>
    <Route path='/activists' component={ AsyncActivists } />
    <Route path='/' component={ AsyncPosts } />
  </Switch>
)

export default routes
