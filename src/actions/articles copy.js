



/* Запрос списка статей */
export const getArticlesList = (offset = 0) => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_ARTICLES_REQUEST'
    });
    try {
      const response = await fetch(`https://conduit.productionready.io/api/articles?offset=${offset}`)
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

/* Запрос списка СВОИХ статей */
export const getMyselfArticles = (author, offset = 0) => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_ARTICLES_REQUEST'
    });
    try {
      const response = await fetch(`https://conduit.productionready.io/api/articles?author=${author}&offset=${offset}`)
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

/* Переключение страниц в пагинации */
export const togglePage = (page) => ({
  type: 'TOGGLE_PAGE',
  payload: page
});

/* Запрос статьи по идентификатору (slug) */
export const getArticle = (slug) => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_ONE_ARTICLE_REQUEST'
    });
    try {
      const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`);
      const result = await response.json();
      dispatch({
        type: 'GET_ONE_ARTICLE_SUCCESS',
        article: result.article,
      });
    } catch(error) {
        dispatch({
          type: 'GET_ONE_ARTICLE_FAILURE'
        });
        console.error('Возникла ошибки: ', error);
    };
  }
};

/* Создание статьи */
export const createArticle = (newArticle, token) => {
  return async (dispatch) => {
    /* Начало запроса */
    dispatch({
      type: 'CREATE_NEW_ARTICLE_REQUEST'
    });
    try {
      /* запрос и положительный ответ */
      /* console.log('In create: ', newArticle, token); */
      const response = await fetch(
        'https://conduit.productionready.io/api/articles',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': "Token " + token
          },
          body: JSON.stringify({
            article: {
              title: newArticle.title,
              description: newArticle.description,
              body: newArticle.body,
              tagList: newArticle.tagsList,              
            }
          })
        }
      );
      if (response === null) throw console.log("Oops! ", response.json())

    } catch(error) {
      dispatch({
        type: 'CREATE_NEW_ARTICLE_FAILURE'
      });
    }
  }
};

/* Обновить статью */
export const updateArticle = (token, slug, newData) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_ARTICLE_REQUEST'
    });
    try {
      const response = await fetch(
        `https://conduit.productionready.io/api/articles/${slug}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': "Token " + token
          },
          body: JSON.stringify({
            article: newData
          })
        }
      );
      
      const result = await response.json();
      console.log('Обновление статьи: ', result);
            
      await dispatch(getArticle(slug));
              
    } catch(error) {
        console.error('Возникла ошибка: ', error);
        dispatch({
          type: 'UPDATE_ARTICLE_FAILURE'
        });
    };
  }
};


