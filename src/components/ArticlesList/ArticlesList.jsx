import React, { useEffect/* , useCallback */ } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';

import ArticlePreview from '../ArticlePreview';
import Spiner from '../Spiner';

import { getArticlesList, togglePage } from '../../actions';

import './ArticlesList.css';

const ArticlesList = (props) => {
  const token = localStorage.getItem('token');
  const { getArticlesList, togglePage,
          loader, articles, pageCurrent, articlesCount } = props;
  /* console.log('Articles in AList: ', articles); */
  /* const callback = useCallback(() => getArticlesList, [getArticlesList]);
  useEffect(() => callback(), [callback]); */

  /* if (articles.length === 0) getArticlesList(); */
  /* const callback = useCallback(() => getArticlesList, []); */
  

  /* Почему так получается цикл */
  useEffect(() => {
      getArticlesList(0, token); 
  }, [getArticlesList]);

  /* И так */
  /* useEffect(async () => {
    await getArticlesList(); 
  }, []); */

  /* А так работает */

  /* const loadArticles = () => {
    getArticlesList();
  }

  useEffect(() => {
    loadArticles(); 
  }, []); */
  
  const handlePage = (page) => {
    togglePage(page);
    token ? getArticlesList(page * 20 - 20, token) : getArticlesList(page * 20 - 20, null);
  };
  
  return (
    <div>
      <div>
        { loader ? <Spiner /> : articles.map((article) => <ArticlePreview key={article.slug} article={article} pageCurrent={pageCurrent} />) }
      </div>
      <div className="pagination">
        <Pagination
          size="small"
          total={articlesCount}
          pageSize={20}
          showSizeChanger={false}
          current={pageCurrent}
          onChange={handlePage}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loader, togglePage, articles, pageCurrent, articlesCount } = state;
  return {
    loader,
    togglePage,
    articles,
    pageCurrent,
    articlesCount
  };
};

export default connect(mapStateToProps, {getArticlesList, togglePage})(ArticlesList);