const getArticlesRequest = 'GET_ARTICLES_REQUEST';

/* Запрос списка статей */
export const getArticlesList = (offset = 0, token) => {
  return async (dispatch) => {
    dispatch({
      type: getArticlesRequest
    });
    try {
      const options = token ? {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': "Token " + token
        }
      } : {};
      const response = await fetch(`https://conduit.productionready.io/api/articles?offset=${offset}`, options);
      if (response === null) {
        throw console.log('ERROR!!!. ', response);
      }
      
      const result = await response.json();
      
      dispatch({
        type: 'GET_ARTICLES_SUCCESS',
        articles: result.articles,
        articlesCount: result.articlesCount
      });
    } catch(error) {
        dispatch({
          type: 'GET_ARTICLES_FAILURE'
        });
        console.error('Возникла ошибки: ', error);
    };
  }
};

