import { UserService } from '../service/UserService';

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
      const result = await UserService.registration(data);

      if (result.errors) {
        return dispatch(registrationErrorsAction(result.errors));
      }

      dispatch(registrationSuccessAction(result));
      dispatch(loginAction());
      const { username, token } = result.user;
      addLocalData(username, token);
    } catch (err) {
      dispatch(registrationFailureAction());
      console.error("Oops! There is an Error in registration: ", err);
    }
  }
};

/* Аутентификация */
export const authentication = (userRegister) => {
  return async (dispatch) => {
    dispatch(authenticationRequestAction());
    try {
      const result = await UserService.authentication(userRegister);
      
      if (result.errors) {
        return dispatch(authenticationSuccessErrorAction(result));
      }

      dispatch(authenticationSuccessAction(result));
      const { username, token } = result.user;
      addLocalData(username, token);
      dispatch(loginAction());
    } catch(err) {
      dispatch(authenticationFailureAction());
      console.error('Возникла ошибка: ', err);
    };
  }
};

/* Перезапуск аккаунта при входе, если пользователь не использовал "Log out" */
export const restartUser = (token) => {
  return async (dispatch) => {
    dispatch(restartUserRequestAction());
    try {
      const result = await UserService.restartUser(token);
      dispatch(restartUserSuccessAction(result.user));
      dispatch(loginAction());
    } catch(err) {
        dispatch(restartUserFailureAction());
        console.error('Возникла ошибка: ', err);
    };
  }
};

/* Получить текущего пользователя */
export const getCurrentUser = (token) => {
  return async (dispatch) => {
    dispatch(getCurrentUserRequestAction());
    try {
      const result = await UserService.getCurrentUser(token);
      dispatch(getCurrentUserSuccessAction(result.user));
    } catch (err) {
      console.log("Oops! Error: ", err);
    }
  }
};

/* Обновить данные пользователя */
export const updateUser = (token, newData) => {
  return async (dispatch) => {
    dispatch(updateUserRequestAction());
    try {
      const result = await UserService.updateUser(token, newData);
      addLocalData(result.user.username, result.user.token);
      dispatch(restartUser(result.user.token));
    } catch(err) {
        dispatch(updateUserFailureAction());
        console.error('Возникла ошибка: ', err);
    };
  }
};
