import {
  getArticlesRequestAction,
  getArticlesSuccessAction,
  getArticlesFailureAction,

  getSingleArticleRequestAction,
  getSingleArticleSuccessAction,
  getSingleArticleFailureAction,

  createArticleRequestAction,
  createArticleFailureAction,

  updateArticleRequestAction,
  updateArticleFailureAction,

  deleteArticleRequestAction,
  deleteArticleFailureAction,

  setFavoriteArticleRequestAction,
  setFavoriteArticleSuccessAction,
  setFavoriteArticleFailureAction,

  deleteFavoriteArticleRequestAction,
  deleteFavoriteArticleSuccessAction,
  deleteFavoriteArticleFailureAction
} from './articlesCreateAction';

/* Запрос общего списка статей */
export const getArticlesList = (offset = 0, token) => {
  return async (dispatch) => {
    dispatch(getArticlesRequestAction());
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
      
      dispatch(getArticlesSuccessAction(result));
    } catch(error) {
        dispatch(getArticlesFailureAction());
        console.error('Возникла ошибки: ', error);
    };
  }
};

/* Запрос списка СВОИХ статей */
export const getMyselfArticles = (author, offset = 0) => {
  return async (dispatch) => {
    dispatch(getArticlesRequestAction());

    try {
      const response = await fetch(`https://conduit.productionready.io/api/articles?author=${author}&offset=${offset}`)
      
      if (response === null) {
        throw console.log('ERROR!!!. ', response);
      }
      
      const result = await response.json();
            
      dispatch(getArticlesSuccessAction(result));
    } catch(error) {
        dispatch(getArticlesFailureAction());
        console.error('Возникла ошибки: ', error);
    };
  }
};

/* Запрос статьи по идентификатору (slug) */
export const getSingleArticle = (slug, token) => {
  return async (dispatch) => {
    dispatch(getSingleArticleRequestAction());
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
      dispatch(getSingleArticleSuccessAction(result.article));
    } catch(error) {
        dispatch(getSingleArticleFailureAction());
        console.error('Возникла ошибки: ', error);
    };
  }
};

/* Создание статьи */
export const createArticle = (newArticle, token) => {
  return async (dispatch) => {
    dispatch(createArticleRequestAction()); // Нет обработки экшена в редьюсере

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
       
      // Какое действие при положительном результате

    } catch(error) {
      dispatch(createArticleFailureAction());
    }
  }
};

/* Обновить статью */
export const updateArticle = (token, slug, newData) => {
  return async (dispatch) => {
    dispatch(updateArticleRequestAction());
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
        dispatch(updateArticleFailureAction());
        console.error('Возникла ошибка: ', error);
    };
  }
};

/* Удаление статьи */
export const deleteArticle = (slug, token, author) => {
  return async (dispatch) => {
    dispatch(deleteArticleRequestAction());
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
      dispatch(getMyselfArticles(author));
    } catch(error) {
        dispatch(deleteArticleFailureAction());
        console.error('Возникла ошибки: ', error);
    };
  }
};

/* Добавление статьи в избранное */
export const setFavoriteArticle = (slug, token) => {
  return async (dispatch) => {
    dispatch(setFavoriteArticleRequestAction(slug));
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
      dispatch(setFavoriteArticleSuccessAction(result.article));

      // Диспатч на обновление списка статей? - dispatch(getArticlesList(offset));

    } catch(error) {
        dispatch(setFavoriteArticleFailureAction()); // нет редьюсера
        console.error('Возникла ошибка: ', error);
    };
  }
};

/* Удалить статьи из избранного */
export const deleteFavoriteArticle = (slug, token) => {
  return async (dispatch) => {
    dispatch(deleteFavoriteArticleRequestAction());
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
      dispatch(deleteFavoriteArticleSuccessAction(result.article));
    } catch(error) {
        dispatch(deleteFavoriteArticleFailureAction());
        console.error('Возникла ошибка: ', error);
    };
  }
};
