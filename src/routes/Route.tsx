/* eslint-disable react/prop-types */
// eslint-disable-next-line no-use-before-define
import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDomRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
// true/true = ok
// true/false = Redirecionar ele para login
// false/true = redirecionar para o dashboard
// false/false = ok

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDomRoute
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) => (isPrivate === !!user ? (
        <Component />
      ) : (
        <Redirect
          to={{
            pathname: isPrivate ? '/' : '/dashboard',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

export default Route;
