import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import ErrorIndicator from '../ErrorIndicator';
import HeaderTab from '../HeaderTab';
import Routes from '../Routes';

import './App.css';

const App = (props) => {
  const { error } = props;
    
  if (error) {
      return <ErrorIndicator />
  }

  return (
    <div>    
      <Router>
        <HeaderTab />
        <main className="main">
          <Routes />
        </main>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { error } = state.genericReducer;
  return { error };
};

App.propTypes = {
  error: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(App);
