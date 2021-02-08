import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import ArticleLayout from '../ArticleLayout';
import ArticlesList from '../ArticlesList';
import CreateArticle from '../CreateArticle';
import EditArticle from '../EditArticle';
import EditProfile from '../EditProfile';
import MyArticles from '../MyArticles';
import PrivateRoute from '../PrivateRoute';
import SignIn from '../SignIn';
import SignUp from '../SignUp';


const Routes = () => {
  const {article} = useSelector((state) => state.articlesReducer);
  const authorOfArticle = article?.author.username;
  const user = localStorage.getItem('localUser');
  
  return (
    <Switch>
      <Route path="/" exact component={ArticlesList} />
      <Route path="/my-articles" exact component={MyArticles} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <PrivateRoute path="/profile" exact component={EditProfile} />
      <Route
        path="/articles/:slug"
        exact
        render={({ match }) => {
          const { slug } = match.params;
          return <ArticleLayout slug={slug}/>
        }} />
      <Route
        path="/articles/:slug/edit"
        render={({ match }) => {
          const { slug } = match.params;
          return authorOfArticle === user ? <EditArticle slug={slug} /> : <Redirect to={`/articles/${slug}`} />
        }}
      />
      <PrivateRoute path="/new-article" exact component={CreateArticle} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;


