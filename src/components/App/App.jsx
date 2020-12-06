import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderTab from '../HeaderTab';
/* import Spiner from '../Spiner'; */
import ErrorIndicator from '../ErrorIndicator';
import ArticlesList from '../ArticlesList';
import Article from '../Article';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import EditProfile from '../EditProfile';
import CreateArticle from '../CreateArticle';
import MyArticles from '../MyArticles';
import EditArticle from '../EditArticle';
import PrivateRoute from '../PrivateRoute';

/* import EditProfile from '../EditProfile'; */
/* import { updateUser } from '../../actions'; */

const App = (props) => {

  const { /* loader, */ error/* , updateUser */ } = props;
  
  const token = localStorage.getItem('token');
  
  if (error) {
      return <ErrorIndicator />
    }

  /* if (token) {
      updateUser(token);
  } */
/*   if (loader) {
    return <Spiner />
  } */
  


  
  return (
    <div>
      <Router>
        <HeaderTab token={token} />
        <main className="main">
          <Route path="/" exact component={ArticlesList} />
          <Route path="/my-articles" exact component={MyArticles} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/profile" component={EditProfile} />
          {/* <Route path="/new-article" component={CreateArticle} /> */}
          <PrivateRoute exact path="/new-article" component={CreateArticle} />
          <Route path="/articles/:slug" exact
            render={({ match }) => {
              const { slug } = match.params;
              return <Article slug={slug}/>
            }} />
          <Route path="/articles/:slug/edit"
                 render={({ match }) => {
                   /* console.log('match: ', match); */
                   const { slug } = match.params;
                   return <EditArticle slug={slug} />
                 }}
          />
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

export default connect(mapStateToProps)(App);