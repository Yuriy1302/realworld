export const GET_ARTICLES_REQUEST = 'GET_ARTICLES_REQUEST';
export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_FAILURE = 'GET_ARTICLES_FAILURE';

export const GET_SINGLE_ARTICLE_REQUEST = 'GET_SINGLE_ARTICLE_REQUEST';
export const GET_SINGLE_ARTICLE_SUCCESS = 'GET_SINGLE_ARTICLE_SUCCESS';
export const GET_SINGLE_ARTICLE_FAILURE = 'GET_SINGLE_ARTICLE_FAILURE';

export const CREATE_ARTICLE_REQUEST = 'CREATE_ARTICLE_REQUEST';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';

export const UPDATE_ARTICLE_REQUEST = 'UPDATE_ARTICLE_REQUEST';
export const UPDATE_ARTICLE_FAILURE = 'UPDATE_ARTICLE_FAILURE';

export const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE';

export const ADD_FAVORITE_ARTICLE_REQUEST = 'ADD_FAVORITE_ARTICLE_REQUEST';
export const ADD_FAVORITE_ARTICLE_SUCCESS = 'ADD_FAVORITE_ARTICLE_SUCCESS';
export const ADD_FAVORITE_ARTICLE_FAILURE = 'ADD_FAVORITE_ARTICLE_FAILURE';

export const UNFAVORITE_ARTICLE_REQUEST = 'UNFAVORITE_ARTICLE_REQUEST';
export const UNFAVORITE_ARTICLE_SUCCESS = 'UNFAVORITE_ARTICLE_SUCCESS';
export const UNFAVORITE_ARTICLE_FAILURE = 'UNFAVORITE_ARTICLE_FAILURE';

/* Запрос списка статей */
export const getArticlesList = (offset = 0, token) => {
  return async (dispatch) => {
    dispatch({
      type: GET_ARTICLES_REQUEST
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
        type: GET_ARTICLES_SUCCESS,
        articles: result.articles,
        articlesCount: result.articlesCount
      });
    } catch(error) {
        dispatch({
          type: GET_ARTICLES_FAILURE
        });
        console.error('Возникла ошибки: ', error);
    };
  }
};

/* Запрос списка СВОИХ статей */
export const getMyselfArticles = (author, offset = 0) => {
  return async (dispatch) => {
    dispatch({
      type: GET_ARTICLES_REQUEST
    });
    try {
      const response = await fetch(`https://conduit.productionready.io/api/articles?author=${author}&offset=${offset}`)
      if (response === null) {
        throw console.log('ERROR!!!. ', response);
      }
      const result = await response.json();
      
      
      dispatch({
        type: GET_ARTICLES_SUCCESS,
        articles: result.articles, // исправить - объеденить в payload
        articlesCount: result.articlesCount
      });
    } catch(error) {
        dispatch({
          type: GET_ARTICLES_FAILURE
        });
        console.error('Возникла ошибки: ', error);
    };
  }
};

/* Запрос статьи по идентификатору (slug) */
export const getSingleArticle = (slug, token) => {
  return async (dispatch) => {
    dispatch({
      type: GET_SINGLE_ARTICLE_REQUEST
    });
    try {
      const options = token ? {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': "Token " + token
        }
      } : {};
      const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, options);
      const result = await response.json();
      dispatch({
        type: GET_SINGLE_ARTICLE_SUCCESS,
        article: result.article,
      });
    } catch(error) {
        dispatch({
          type: GET_SINGLE_ARTICLE_FAILURE
        });
        console.error('Возникла ошибки: ', error);
    };
  }
};

/* Создание статьи */
export const createArticle = (newArticle, token) => {
  return async (dispatch) => {
    
    dispatch({
      type: CREATE_ARTICLE_REQUEST // Нет обработки экшена в редьюсере
    });
    try {
      
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
       
      // ????????????????? А какое действие при положительном результате

    } catch(error) {
      // Действие на случай перехвата ошибки
      dispatch({
        type: CREATE_ARTICLE_FAILURE
      });
    }
  }
};

/* Обновить статью */
export const updateArticle = (token, slug, newData) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_ARTICLE_REQUEST
    });
    try {
  /*     const response = await fetch( */
      await fetch(
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
      
      await dispatch(getSingleArticle(slug));
              
    } catch(error) {
        console.error('Возникла ошибка: ', error);
        dispatch({
          type: UPDATE_ARTICLE_FAILURE
        });
    };
  }
};

/* Удаление статьи */
export const deleteArticle = (slug, token, author) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_ARTICLE_REQUEST
    });
    try {
      await fetch(`https://conduit.productionready.io/api/articles/${slug}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': "Token " + token
          }
        }
      );
      // const result = await response.json();
      dispatch(getMyselfArticles(author));
    } catch(error) {
        dispatch({
          type: DELETE_ARTICLE_FAILURE
        });
        console.error('Возникла ошибки: ', error);
    };
  }
};

/* Добавление в избранное */
export const setFavoriteArticle = (slug, token, offset) => {
  return async (dispatch) => {
    //console.log('Slug in action', slug);
    dispatch({
      type: ADD_FAVORITE_ARTICLE_REQUEST,
      payload: slug
    });
    try {
      const response = await fetch(
        `https://conduit.productionready.io/api/articles/${slug}/favorite`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': "Token " + token
          }
        }
      );
      const result = await response.json();
      console.log('result in action favorited: ', result);
      /* Диспатч на обновление списка статей ? */
      
      dispatch({
        type: ADD_FAVORITE_ARTICLE_SUCCESS,
        payload: result.article,
      });
      /* dispatch(getArticlesList(offset)); */
    } catch(error) {
        console.error('Возникла ошибка: ', error);
        dispatch({
          type: ADD_FAVORITE_ARTICLE_FAILURE // нет редьюсера
        });
    };
  }
};

/* Удалить из избранного */
export const deleteFavoriteArticle = (slug, token, offset) => {
  return async (dispatch) => {


    dispatch({
      type: UNFAVORITE_ARTICLE_REQUEST,
      payload: slug
    });
    try {
      const response = await fetch(
        `https://conduit.productionready.io/api/articles/${slug}/favorite`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': "Token " + token
          }
        }
      );
      const result = await response.json();
      
      /* Диспатч на обновление списка статей ? */
      
      dispatch({
        type: UNFAVORITE_ARTICLE_SUCCESS,
        payload: result.article,
      });
      /* dispatch(getArticlesList(offset)); */
    } catch(error) {
        console.error('Возникла ошибка: ', error);
        dispatch({
          type: UNFAVORITE_ARTICLE_FAILURE // нет редьюсера
        });
    };
  }
};















