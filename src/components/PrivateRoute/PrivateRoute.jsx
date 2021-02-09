import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getLocalData } from '../../service/local-service';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  return <Route
    {...rest}
    render={(properties) => getLocalData('token')
      ? <Component {...properties} />
      : <Redirect
          to={{
            pathname: '/sign-up',
            // eslint-disable-next-line
            state: { from: props.location }
          }}
        />
    }
  />
};

PrivateRoute.propTypes = {
  component: PropTypes.any
}

export default PrivateRoute;
