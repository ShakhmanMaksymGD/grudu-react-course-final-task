import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface GuestRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  redirectTo?: string;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ 
  component: Component, 
  redirectTo = '/tweets',
  ...rest 
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
};

export default GuestRoute;