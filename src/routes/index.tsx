// eslint-disable-next-line no-use-before-define
import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import Deposity from '../pages/Deposity';
import Withdraw from '../pages/Withdraw';
import Pay from '../pages/Pay';
import SignIn from '../pages/Signin';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/import" component={Import} isPrivate />

    <Route path="/deposity" component={Deposity} isPrivate />
    <Route path="/withdraw" component={Withdraw} isPrivate />
    <Route path="/pay" component={Pay} isPrivate />

  </Switch>
);

export default Routes;
