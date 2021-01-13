import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Spiner from '../Spiner';
import EditArticleRenderForm from './EditArticleRenderForm';

import { getSingleArticle } from '../../actions';

import './EditArticle.css';

const EditArticle = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleArticle(props.slug));
    // eslint-disable-next-line
  }, []);
  const { article } = useSelector((state) => state.articlesReducer);

  return (
    <div>
      <div className="edite-article">
        <h2>Edit article</h2>
        { article ? <EditArticleRenderForm article={article} /> : <Spiner /> }
      </div>
      <div className="p-top"></div>
    </div>
  );
};

EditArticle.propTypes = {
  slug: PropTypes.string.isRequired
}

export default withRouter(EditArticle);
