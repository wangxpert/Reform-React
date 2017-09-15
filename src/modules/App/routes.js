import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

import Authentication from '../Authentication'
import Account from '../Account'

const AsyncContactUs = asyncComponent(() => import('../ContactUs'))
const AsyncAboutUs = asyncComponent(() => import('../AboutUs'))
const AsyncTerms = asyncComponent(() => import('../Terms'))
const AsyncWhistleBlower = asyncComponent(() => import('../WhistleBlower'))
const AsyncAdvertise = asyncComponent(() => import('../Advertise'))
const AsyncFeedback = asyncComponent(() => import('../Feedback'))
const AsyncPrivacy = asyncComponent(() => import('../Privacy'))
const AsyncPost = asyncComponent(() => import('../Post'))
const AsyncActivism = asyncComponent(() => import('../Activism'))

const routes = (
  <Switch path='/'>
    <Route path='/contactus' component={ AsyncContactUs } />
    <Route path='/aboutus' component={ AsyncAboutUs } />
    <Route path='/terms' component={ AsyncTerms } />
    <Route path='/whistleblower' component={ AsyncWhistleBlower } />
    <Route path='/advertise' component={ AsyncAdvertise } />
    <Route path='/feedback' component={ AsyncFeedback } />
    <Route path='/privacy' component={ AsyncPrivacy } />

    <Route path='/auth' component={ Authentication } />
    <Route path='/account' component={ Account } />

    <Route path='/post' component={ AsyncPost } />
    <Route path='/activism' component={ AsyncActivism } />

    <Redirect exact path='/' to='/post' />
    <Redirect path='*' to='/' />

  </Switch>
)

export default routes
