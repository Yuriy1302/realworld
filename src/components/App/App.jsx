import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Article from '../Article';
import ArticlesList from '../ArticlesList';
import CreateArticle from '../CreateArticle';
import EditArticle from '../EditArticle';
import EditProfile from '../EditProfile';
import ErrorIndicator from '../ErrorIndicator';
import HeaderTab from '../HeaderTab';
import MyArticles from '../MyArticles';
import PrivateRoute from '../PrivateRoute';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

const App = (props) => {
  const { error } = props;
  /* const token = localStorage.getItem('token'); */
  
  if (error) {
      return <ErrorIndicator />
    }

  return (
    <div>
      <Router>
        <HeaderTab /* token={token} */ />
        <main className="main">
          <Route path="/" exact component={ArticlesList} />
          <Route path="/my-articles" exact component={MyArticles} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/profile" component={EditProfile} />
          <Route
            path="/articles/:slug"
            exact
            render={({ match }) => {
              const { slug } = match.params;
              return <Article slug={slug}/>
            }} />
          <Route
            path="/articles/:slug/edit"
            render={({ match }) => {
              const { slug } = match.params;
              return <EditArticle slug={slug} />
            }}
          />
          <PrivateRoute path="/new-article" exact component={CreateArticle} />
        </main>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loader, error } = state;
  return {
    loader,
    error
  };
}

App.propTypes = {
  error: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(App);
