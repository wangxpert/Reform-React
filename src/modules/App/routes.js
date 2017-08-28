import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

import Authentication from '../Authentication'
import Account from '../Account'

import Main from '../Main'

const AsyncContactUs = asyncComponent(() => import('../ContactUs'))
const AsyncAboutUs = asyncComponent(() => import('../AboutUs'))
const AsyncTerms = asyncComponent(() => import('../Terms'))
const AsyncAdvertise = asyncComponent(() => import('../Advertise'))
const AsyncPrivacy = asyncComponent(() => import('../Privacy'))

const routes = (
  <Switch>
    <Route path='/contactus' component={ AsyncContactUs } />
    <Route path='/aboutus' component={ AsyncAboutUs } />
    <Route path='/terms' component={ AsyncTerms } />
    <Route path='/advertise' component={ AsyncAdvertise } />
    <Route path='/privacy' component={ AsyncPrivacy } />
    <Route path='/auth' component={ Authentication } />
    <Route path='/account' component={ Account } />
    <Main />
  </Switch>
)

export default routes
