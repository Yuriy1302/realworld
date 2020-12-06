
export const logOutUser = 'LOG_OUT_USER';
export const loInUser = 'LOG_IN_USER';

export const registrationRequest = 'REGISTRATION_USER_REQUEST';
export const registrationSuccess = 'REGISTRATION_USER_SUCCESS';
export const registrationFailure = 'REGISTRATION_USER_FAILURE';

export const authenticationRequest = 'AUTHENTICATION_USER_REQUEST'
export const authenticationSuccess = 'AUTHENTICATION_USER_SUCCESS';
export const authenticationFailure = 'AUTHENTICATION_USER_FAILURE';

export const autoLoginRequest = 'AUTO_LOGIN_REQUEST';
export const autoLoginSuccess = 'AUTO_LOGIN_SUCCESS';
export const autoLoginFailure = 'AUTO_LOGIN_FAILURE';

export const updateUserRequest = 'UPDATE_USER_REQUEST';
export const updateUserSuccess = 'UPDATE_USER_SUCCESS';
export const updateUserFailure = 'UPDATE_USER_FAILURE';

export const currentUserRequest = 'GET_CURRENT_USER_REQUEST';
export const currentUserSuccess = 'GET_CURRENT_USER_SUCCESS';
export const currentUserFailure = 'GET_CURRENT_USER_FAILURE';



export const logOutAction = () => ({ type: logOutUser }); // logoutAction - 'LOG_OUT'
export const logInAction = () => ({ type: loInUser }); // loginAction - 'LOG_IN'

/* Регистрация */
export const registration = (data) => { // registration
  return async (dispatch) => {
    dispatch({ type: registrationRequest }); // 'REGISTRATION_REQUEST'
    
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

      const result = await response.json();
      
      if (response.ok) {
        dispatch({
          type: registrationSuccess, // 'REGISTRATION_SUCCESS'
          payload: result,
        });
        dispatch(loginAction());
        const { username, token } = result.user;
        
        localStorage.setItem('localUser', JSON.stringify(username));
        localStorage.setItem('token', token);
      } else  {
        dispatch({
          type: 'REGISTRATION_ERRORS',
          payload: result
        });
        return;
      }
    } catch (error) {
      console.log("Oops in registration!");
      dispatch({
        type: registrationFailure // 'REGISTRATION_FAILURE'
      });
    }
  }
}

/* Аутентификация */
export const authentication = (userRegister) => { // authentication
  return async (dispatch) => {
    dispatch({
      type: authenticationRequest // 'AUTHENTICATION_REQUEST'
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
          type: authenticationSuccess, // 'AUTHENTICATION_SUCCESS'
          payload: result,
        });
        dispatch(loginAction());
        const { username, token } = result.user;

        localStorage.setItem('localUser', username);
        localStorage.setItem('token', token);
      } else  {
        dispatch({
          type: 'AUTHENTICATION_USER_SUCCESS_ERRORS', // 'AUTHENTICATION_SUCCESS_ERRORS'
          payload: result
        });
        return null;
      }
      
    } catch(error) {
        console.error('Возникла ошибка: ', error);
        dispatch({
          type: authenticationFailure // 'AUTHENTICATION_FAILURE'
        });
    };
  }
};

/* Перезапуск аккаунта, если не было "Log out" */
export const autoLogin = (token) => { // updateUser
  return async (dispatch) => {
    dispatch({
      type: autoLoginRequest // 'UPDATE_USER_REQUEST'
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
        type: autoLoginSuccess, // 'UPDATE_USER_SUCCESS'
        payload: result,
      });
      dispatch(loginAction());
    } catch(error) {
        console.error('Возникла ошибка: ', error);
        dispatch({
          type: autoLoginFailure // 'UPDATE_USER_FAILURE'
        });
    };
  }
};

/* Обновить данные профиля */
export const updateUser = (token, newData) => { // updateNewData
  return async (dispatch) => {
    dispatch({
      type: updateUserRequest // 'UPDATE_NEW_DATA_REQUEST'
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
      dispatch(autoLogin(result.user.token)); // dispatch(updateUser(result.user.token));
    } catch(error) {
        console.error('Возникла ошибка: ', error);
        dispatch({
          type: updateUserFailure
        });
    };
  }
};

/* Получить текущего пользователя */
export const getCurrentUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: currentUserRequest }); // 'GET_CURRENT_USER_REQUEST'
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
      dispatch({ type: currentUserSuccess, payload: result.user}); // 'GET_CURRENT_USER_SUCCESS'
    } catch (error) {
      console.log("Oops! Error: ", error);
      /* Добавить dispatch и действие */
      dispatch({ type: currentUserFailure });
    }
  }
};


