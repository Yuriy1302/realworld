import { connect, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Spiner from '../Spiner';
import ArticlePreview from '../ArticlePreview';
import { Empty } from 'antd';

import { getMyselfArticles } from '../../actions';

import './MyArticles.css';

const MyArticles = (props) => {
  const dispatch = useDispatch();
  const { loader, articles } = props;
  const author = localStorage.getItem('localUser');

  useEffect(() => {
    dispatch(getMyselfArticles(author));
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
      <div>
        { loader ? <Spiner /> : articles.map((article) => <ArticlePreview key={article.slug} article={article} />) }
      </div>
      {/* Pagination */}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loader } = state.genericReducer;
  const { articles } = state.articlesReducer;
  return {
    loader,
    articles,
  };
}

MyArticles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  loader: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, { getMyselfArticles })(MyArticles);
