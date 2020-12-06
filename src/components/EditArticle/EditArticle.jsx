import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* import classNames from 'classnames'; */

import EditArticleRenderForm from './EditArticleRenderForm';
import Spiner from '../Spiner';

import { getArticle } from '../../actions';

import './EditArticle.css';

const EditArticle = (props) => {
  /* console.log('props-slug: ', props.slug); */
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticle(props.slug));
  }, []);
  const article = useSelector((state) => state.article);
  /* console.log('article in edit: ', article); */

  return (
    <div className="create-article">
      <h2>Edit article</h2>
      {/* <EditArticleRenderForm /> */}
      { article ? <EditArticleRenderForm article={article} /> : <Spiner /> }
    </div>
  );
};

export default withRouter(EditArticle);