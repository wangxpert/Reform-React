import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Import Components
import Post from '../Post';
import ContactUs from '../ContactUs';

const routes = (
  <Switch>
    <Route exact path='/' component={Post} />
    <Route path='/contactus' component={ContactUs} />
  </Switch>
);

export default routes;
