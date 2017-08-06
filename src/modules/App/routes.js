import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Import Components
import Post from '../Post';
import ContactUs from '../ContactUs';
import asyncComponent from '../../components/AsyncComponent';

const AsyncPost = asyncComponent(() => import('../Post'));
const AsyncContactUs = asyncComponent(() => import('../ContactUs'));

const routes = (
  <Switch>
    <Route exact path='/' component={ AsyncPost } />
    <Route path='/contactus' component={ AsyncContactUs } />
  </Switch>
);

export default routes;
