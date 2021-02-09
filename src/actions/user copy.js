import {
  loginAction,
  logoutAction,

  registrationRequestAction,
  registrationErrorsAction,
  registrationSuccessAction,
  registrationFailureAction,

  authenticationRequestAction,
  authenticationSuccessAction,
  authenticationSuccessErrorAction,
  authenticationFailureAction,

  restartUserRequestAction,
  restartUserSuccessAction,
  restartUserFailureAction,
    
  getCurrentUserRequestAction,
  getCurrentUserSuccessAction,
    
  updateUserRequestAction,
  updateUserFailureAction

} from './userCreateActions';

import { addLocalData } from '../service/local-service';

/* Выход из аккаунта */
export const logout = () => logoutAction();


/* Регистрация */
export const registration = (data) => {
  return async (dispatch) => {
    dispatch(registrationRequestAction());
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
        dispatch(registrationErrorsAction(errorResult.errors));
        return;
      }

      const result = await response.json();
      dispatch(registrationSuccessAction(result));
      dispatch(loginAction());
      const { username, token } = result.user;
      addLocalData(username, token);
    } catch (error) {
      dispatch(registrationFailureAction());
      console.error("Oops in registration! Error: ", error);
    }
  }
};

/* Аутентификация */
export const authentication = (userRegister) => {
  return async (dispatch) => {
    dispatch(authenticationRequestAction());
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
        dispatch(authenticationSuccessAction(result));
        dispatch(loginAction());
        const { username, token } = result.user;
        addLocalData(username, token);
      } else  {
        dispatch(authenticationSuccessErrorAction(result));
        return null;
      }
    } catch(error) {
        dispatch(authenticationFailureAction());
        console.error('Возникла ошибка: ', error);
    };
  }
};

/* Перезапуск аккаунта при входе, если пользователь не использовал "Log out" */
export const restartUser = (token) => {
  return async (dispatch) => {
    dispatch(restartUserRequestAction());
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
      dispatch(restartUserSuccessAction(result.user));
      dispatch(loginAction());
    } catch(error) {
        dispatch(restartUserFailureAction());
        console.error('Возникла ошибка: ', error);
    };
  }
};

/* Получить текущего пользователя */
export const getCurrentUser = (token) => {
  return async (dispatch) => {
    dispatch(getCurrentUserRequestAction());
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
      dispatch(getCurrentUserSuccessAction(result.user));
    } catch (error) {
      console.log("Oops! Error: ", error);
    }
  }
};

/* Обновить данные профиля */
export const updateUser = (token, newData) => {
  return async (dispatch) => {
    dispatch(updateUserRequestAction());
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
      addLocalData(result.user.username, result.user.token);
      dispatch(restartUser(result.user.token));
    } catch(error) {
        dispatch(updateUserFailureAction());
        console.error('Возникла ошибка: ', error);
    };
  }
};
