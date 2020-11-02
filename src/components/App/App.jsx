import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderTab from '../HeaderTab';
import Spiner from '../Spiner';
import ErrorIndicator from '../ErrorIndicator';
import ArticlesList from '../ArticlesList';
import Article from '../Article';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import EditProfile from '../EditProfile';
import CreateArticle from '../CreateArticle';
/* import EditProfile from '../EditProfile'; */



const mapStateToProps = (state) => {
  const { loader, error } = state;
  return {
    loader,
    error
  };
}

const App = (props) => {
  
  const { loader, error } = props;
  

  
  
  if (error) {
    return <ErrorIndicator />
  }
  
  return (
    <div>
      <Router>
        <HeaderTab />
        <main className="main">
          <Route path="/" exact component={loader ? Spiner : ArticlesList} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/profile" component={EditProfile} />
          <Route path="/new-article" component={CreateArticle} />
          <Route path="/articles/:slug"
            render={({ match }) => {
              const { slug } = match.params;
              return <Article slug={slug}/>
            }} />
        </main>
      </Router>
    </div>
  );
};

export default connect(mapStateToProps)(App);