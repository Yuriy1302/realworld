export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
export const REGISTRATION_ERRORS = 'REGISTRATION_ERRORS';

export const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';
export const AUTHENTICATION_SUCCESS_ERRORS = 'AUTHENTICATION_SUCCESS_ERRORS';

export const RESTART_USER_REQUEST = 'RESTART_USER_REQUEST';
export const RESTART_USER_SUCCESS = 'RESTART_USER_SUCCESS';
export const RESTART_USER_FAILURE = 'RESTART_USER_FAILURE';

export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const loginAction = () => ({
  type: LOG_IN
});

export const logoutAction = () => ({
  type: LOG_OUT
});

/* Регистрация */
export const registration = (data) => {
  return async (dispatch) => {
    dispatch({
      type: REGISTRATION_REQUEST
    });
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

      if (!response.ok && response.status === 422) {
        const errorResult = await response.json();
        dispatch({
          type: REGISTRATION_ERRORS,
          payload: errorResult.errors
        })
        return;
      }

      const result = await response.json();
      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: result,
      });
      dispatch(loginAction());
      const { username, token } = result.user;
      localStorage.setItem('localUser', JSON.stringify(username));
      localStorage.setItem('token', token);
    } catch (error) {
      dispatch({
        type: REGISTRATION_FAILURE
      });
      console.error("Oops in registration! Error: ", error);
    }
  }
};

/* Аутентификация */
export const authentication = (userRegister) => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATION_REQUEST
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
      const result = await response.json();

      if (response.ok) {
        dispatch({
          type: AUTHENTICATION_SUCCESS,
          payload: result,
        });
        dispatch(loginAction());
        const { username, token } = result.user;
        localStorage.setItem('localUser', username);
        localStorage.setItem('token', token);
      } else  {
        dispatch({
          type: AUTHENTICATION_SUCCESS_ERRORS,
          payload: result
        });
        return null;
      }
    } catch(error) {
        dispatch({
          type: AUTHENTICATION_FAILURE
        });
        console.error('Возникла ошибка: ', error);
    };
  }
};

/* Перезапуск аккаунта при входе, если пользователь не использовал "Log out" */
export const restartUser = (token) => {
  return async (dispatch) => {
    dispatch({
      type: RESTART_USER_REQUEST
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
      const result = await response.json();
      dispatch({
        type: RESTART_USER_SUCCESS,
        payload: result.user,
      });
      dispatch(loginAction());
    } catch(error) {
        dispatch({
          type: RESTART_USER_FAILURE
        });
        console.error('Возникла ошибка: ', error);
    };
  }
};

/* Получить текущего пользователя */
export const getCurrentUser = (token) => {
  return async (dispatch) => {
    dispatch({
      type: GET_CURRENT_USER_REQUEST
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
        }
      );
      const result = await response.json();
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: result.user
      });
    } catch (error) {
      console.log("Oops! Error: ", error);
    }
  }
};

/* Обновить данные профиля */
export const updateUser = (token, newData) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST
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
      localStorage.setItem('localUser', result.user.username);
      localStorage.setItem('token', result.user.token);
      dispatch(restartUser(result.user.token));
    } catch(error) {
        dispatch({
          type: UPDATE_USER_FAILURE
        });
        console.error('Возникла ошибка: ', error);
    };
  }
};
