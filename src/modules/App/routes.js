import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Import Components
import asyncComponent from '../../components/AsyncComponent';

const AsyncPosts = asyncComponent(() => import('../Posts'));
const AsyncContactUs = asyncComponent(() => import('../ContactUs'));
const AsyncAboutUs = asyncComponent(() => import('../AboutUs'));
const AsyncTerms = asyncComponent(() => import('../Terms'));
const AsyncAdvertise = asyncComponent(() => import('../Advertise'));
const AsyncPrivacy = asyncComponent(() => import('../Privacy'));
const AsyncActivists = asyncComponent(() => import('../Activists'));
const AsyncLogin = asyncComponent(() => import('../Authentication/Login'));
const AsyncResetPassword = asyncComponent(() => import('../Authentication/ResetPassword'));
const AsyncConfirmPassword = asyncComponent(() => import('../Authentication/ResetPassword/ConfirmPassword'));

const routes = (
  <Switch>
    <Route exact path='/' component={ AsyncPosts } />
    <Route path='/contactus' component={ AsyncContactUs } />
    <Route path='/aboutus' component={ AsyncAboutUs } />
    <Route path='/terms' component={ AsyncTerms } />
    <Route path='/advertise' component={ AsyncAdvertise } />
    <Route path='/privacy' component={ AsyncPrivacy } />
    <Route path='/activists' component={ AsyncActivists } />
    <Route path='/auth/login' component={ AsyncLogin } />
    <Route path='/password/reset' component={ AsyncResetPassword } />
    <Route path='/password/confirm' component={ AsyncConfirmPassword } />
  </Switch>
);

export default routes;
