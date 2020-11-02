export const logoutAction = () => ({ type: 'LOG_OUT' });
export const loginAction = () => ({ type: 'LOG_IN' });
export const resetErrorsResponse = () => ({ type: 'RESET_ERRORS_RESPONSE' });


/* Запрос списка статей */
export const getArticlesList = (offset = 0) => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_ARTICLES_REQUEST'
    });
    try {
      const response = await fetch(`https://conduit.productionready.io/api/articles?offset=${offset}`)
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

/* Аутентификация */
export const authentication = (userRegister) => {
  return async (dispatch) => {
    dispatch({
      type: 'AUTHENTICATION_REQUEST'
    });
    try {
      const response = await fetch(
        'https://conduit.productionready.io/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            user: {
              email: userRegister.email,
              password: userRegister.password
            }
          })
        }
      );
      console.log('result: ', response);

      /* if (!response.ok) {
        throw new Error (response.status);
      } */

      const result = await response.json();
      
      if (response.ok) {
        dispatch({
          type: 'AUTHENTICATION_SUCCESS',
          payload: result,
        });
        dispatch(loginAction());
        const { username, token } = result.user;
        /* localStorage.setItem('user', username);
        localStorage.setItem('token', token); */
        localStorage.setItem('localUser', JSON.stringify(username));
        localStorage.setItem('token', token);
      } else  {
        dispatch({
          type: 'AUTHENTICATION_SUCCESS_ERRORS',
          payload: result
        });
        return;
      }
      
    } catch(error) {
        console.error('Возникла ошибка: ', error);
        dispatch({
          type: 'AUTHENTICATION_FAILURE'
        });
    };
  }
};

/* Перезапуск аккаунта, если не было "Log out" */
export const updateUser = (token) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_USER_REQUEST'
    });
    try {
      const response = await fetch(
        'https://conduit.productionready.io/api/user',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': "Token " + token
          },
        },
      );
      console.log('response updateUser: ', response);
      const result = await response.json();
      console.log('result updateUser: ', result);
      dispatch({
        type: 'UPDATE_USER_SUCCESS',
        payload: result,
      });
      dispatch(loginAction());
    } catch(error) {
        console.error('Возникла ошибка: ', error);
        dispatch({
          type: 'UPDATE_USER_FAILURE'
        });
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
      const response = fetch(
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
              tagList: newArticle.tagList,              
            }
          })
        }
      );
      
    } catch(error) {
      /* Действие на случай перехвата ошибки */
      dispatch({
        type: 'CREATE_NEW_ARTICLE_FAILURE'
      });
    }
  }
}



