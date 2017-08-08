import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Import Components
import asyncComponent from '../../components/AsyncComponent';

const AsyncPosts = asyncComponent(() => import('../Posts'));
const AsyncContactUs = asyncComponent(() => import('../ContactUs'));
const AsyncAboutUs = asyncComponent(() => import('../AboutUs'));
const AsyncTerms = asyncComponent(() => import('../Terms'));
const AsyncPrivacy = asyncComponent(() => import('../Privacy'));
const AsyncActivists = asyncComponent(() => import('../Activists'));

const routes = (
  <Switch>
    <Route exact path='/' component={ AsyncPosts } />
    <Route path='/contactus' component={ AsyncContactUs } />
    <Route path='/aboutus' component={ AsyncAboutUs } />
    <Route path='/terms' component={ AsyncTerms } />
    <Route path='/privacy' component={ AsyncPrivacy } />
    <Route path='/activists' component={ AsyncActivists } />
  </Switch>
);

export default routes;
