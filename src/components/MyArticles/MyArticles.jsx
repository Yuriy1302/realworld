import { connect } from 'react-redux';
import React, { useEffect } from 'react';

import Spiner from '../Spiner';
import ArticlePreview from '../ArticlePreview';

import { getMyselfArticles } from '../../actions';

const MyArticles = (props) => {
  const { getMyselfArticles, loader, articles } = props;
  const author = localStorage.getItem('localUser');

  useEffect(() => {
    getMyselfArticles(author);
    // eslint-disable-next-line
  }, [getMyselfArticles]);

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
  const { loader, articles } = state;
  return {
    loader,
    articles,
  };
}

export default connect(mapStateToProps, { getMyselfArticles })(MyArticles);
