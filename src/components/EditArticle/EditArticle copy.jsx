import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Spiner from '../Spiner';
import EditArticleRenderForm from './EditArticleRenderForm';

import { getArticle } from '../../actions';

import './EditArticle.css';

const EditArticle = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticle(props.slug));
    // eslint-disable-next-line
  }, []);
  const article = useSelector((state) => state.article);

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