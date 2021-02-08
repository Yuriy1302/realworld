import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Spiner from '../Spiner';
import ArticlePreview from '../ArticlePreview';
import { Empty } from 'antd';

import { getMyselfArticles } from '../../actions';

import './MyArticles.css';

const MyArticles = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.genericReducer);
  const { articles } = useSelector((state) => state.articlesReducer);
  
  const author = localStorage.getItem('localUser');

  useEffect(() => {
    dispatch(getMyselfArticles(author, ));
    // eslint-disable-next-line
  }, []);

  if (!articles.length) {
    return (
      <div className="empty-data">
        <Empty description={"You have no articles"} />
      </div>
    )
  }

  return (
    <div>
      { loader ? <Spiner /> : articles.map((article) => <ArticlePreview key={article.slug} article={article} />) }
    </div>
  );
};

MyArticles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  loader: PropTypes.bool,
}

export default MyArticles;
