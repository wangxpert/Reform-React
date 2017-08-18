import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Import Components
import asyncComponent from '../../components/AsyncComponent';

const AsyncLogin = asyncComponent(() => import('../Authentication/Login'));
const AsyncSignUp = asyncComponent(() => import('../Authentication/SignUp'));
const AsyncConfirmUser = asyncComponent(() => import('../Authentication/SignUp/ConfirmUser'));
const AsyncResetPassword = asyncComponent(() => import('../Authentication/ResetPassword'));
const AsyncConfirmPassword = asyncComponent(() => import('../Authentication/ResetPassword/ConfirmPassword'));

const routes = (
  <Switch>
    <Route path='/auth/login' component={ AsyncLogin } />
    <Route path='/auth/signup' component={ AsyncSignUp } />
    <Route path='/auth/confirm/:userName' component={ AsyncConfirmUser } />
    <Route path='/password/reset' component={ AsyncResetPassword } />
    <Route path='/password/confirm/:userName' component={ AsyncConfirmPassword } />
  </Switch>
);

export default routes;
