import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  return <Route
    {...rest}
    render={(props) => localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect
          to={{
            pathname: '/sign-up',
            state: { from: props.location }
          }}
        />
    }
  />
};

export default PrivateRoute;