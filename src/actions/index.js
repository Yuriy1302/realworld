export const logoutAction = () => ({ type: 'LOG_OUT' });
export const loginAction = () => ({ type: 'LOG_IN' });
export const resetErrorsResponse = () => ({ type: 'RESET_ERRORS_RESPONSE' });


/* Запрос списка статей */
export const getArticlesList = (offset = 0, token) => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_ARTICLES_REQUEST'
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

/* Удаление статьи */
export const deleteArticle = (slug, token, author) => {
  return async (dispatch) => {
    dispatch({
      type: 'DELETE_ARTICLE_REQUEST'
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
      /* const result = await response.json(); */
      dispatch(getMyselfArticles(author));
    } catch(error) {
        dispatch({
          type: 'DELETE_ARTICLE_FAILURE'
        });
        console.error('Возникла ошибки: ', error);
    };
  }
};


/* Регистрация */
export const registration = (data) => {
  /* console.log('Data in action: ', data); */
  /* console.log(JSON.stringify({
    user: {
      username: data.username,
      email: data.email,
      password: data.password
    }
  })); */
  return async (dispatch) => {
    dispatch({ type: 'REGISTRATION_REQUEST' });
    
    try {
      const response = await fetch(
        'https://conduit.productionready.io/api/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            user: {
              username: data.username,
              email: data.email,
              password: data.password
            }
          })
        }
      );
      console.error('Response registration: ', response);
      if (!response.ok && response.status === 422) {
        console.log('Есть такие данные!!!');
        const errorResult = await response.json();
        console.log('errorResult: ', errorResult);
        dispatch({
          type: 'REGISTRATION_ERRORS',
          payload: errorResult.errors
        })
        return;
      }

      const result = await response.json();
      console.log('Result in registration: ', result);
      
      
      /* if (response.ok) { */
        dispatch({
          type: 'REGISTRATION_SUCCESS',
          payload: result,
        });
        dispatch(loginAction());
        const { username, token } = result.user;
        /* localStorage.setItem('user', username);
        localStorage.setItem('token', token); */
        localStorage.setItem('localUser', JSON.stringify(username));
        localStorage.setItem('token', token);
     /*  } else  {
        dispatch({
          type: 'REGISTRATION_ERRORS',
          payload: result
        });
        return;
      } */



    } catch (error) {
      console.log("Oops in registration!");
      dispatch({
        type: 'REGISTRATION_FAILURE'
      });
    }
  }
}






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
      /* console.log('result: ', response); */

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
        localStorage.setItem('localUser', username);
        localStorage.setItem('token', token);
      } else  {
        dispatch({
          type: 'AUTHENTICATION_SUCCESS_ERRORS',
          payload: result
        });
        return null;
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
      /* console.log('response updateUser: ', response); */
      const result = await response.json();
      /* console.log('result updateUser: ', result); */
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


/* Обновить данные профиля */
export const updateNewData = (token, newData) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_NEW_DATA_REQUEST'
    });
    try {
      const response = await fetch(
        'https://conduit.productionready.io/api/user',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': "Token " + token
          },
          body: JSON.stringify({
            user: newData
          })
        }
      );
      
      const result = await response.json();
      console.log('Обновление профиля: ', result);
      /* dispatch(authentication({
        email: result.user.email,
        password: result.user.password
      })); */
      localStorage.setItem('localUser', result.user.username);
      localStorage.setItem('token', result.user.token);
      dispatch(updateUser(result.user.token));
        /* dispatch(loginAction()); */
        /* const { username, token } = result.user; */
        
        /* localStorage.setItem('localUser', username);
        localStorage.setItem('token', token); */
      
      
    } catch(error) {
        console.error('Возникла ошибка: ', error);
        dispatch({
          type: 'UPDATE_NEW_DATA_FAILURE'
        });
    };
  }
};





/* Получить текущего пользователя */
export const getCurrentUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: 'GET_CURRENT_USER_REQUEST' });
    try {
      const response = await fetch(
        'https://conduit.productionready.io/api/user',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': "Token " + token
          },
        }
      );
      const result = await response.json();
      /* console.log('Cuurent in action: ', result);
      return result.user; */
      dispatch({ type: 'GET_CURRENT_USER_SUCCESS', payload: result.user});
    } catch (error) {
      console.log("Oops! Error: ", error);
    }
  }
}







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
      /* await console.log('Return create article: ', response.json()); */
      

      /* ????????????????? А какое действие при положительном результате */

    } catch(error) {
      /* Действие на случай перехвата ошибки */
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



/* Добавление лайка */
export const setFavoriteArticle = (slug, token, offset) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_FAVORITE_ARTICLE_REQUEST'
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
      /* console.log('result from action like: ', result); */
      dispatch({
        type: 'ADD_FAVORITE_ARTICLE_SUCCESS',
        payload: result.article,
      });
      /* dispatch(getArticlesList(offset)); */
    } catch(error) {
        console.error('Возникла ошибка: ', error);
        dispatch({
          type: 'ADD_FAVORITE_ARTICLE_FAILURE'
        });
    };
  }
};




