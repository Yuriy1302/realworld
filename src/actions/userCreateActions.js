import {
  LOG_IN,
  LOG_OUT,
  
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  REGISTRATION_ERRORS,
  
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_SUCCESS_ERRORS,
  
  RESTART_USER_REQUEST,
  RESTART_USER_SUCCESS,
  RESTART_USER_FAILURE,
  
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILURE
} from '../config/configUser';

export const loginAction = () => ({
  type: LOG_IN
});

export const logoutAction = () => ({
  type: LOG_OUT
});

export const registrationRequestAction = () => ({
  type: REGISTRATION_REQUEST
});

export const registrationErrorsAction = (err) => ({
  type: REGISTRATION_ERRORS,
  payload: err
});

export const registrationSuccessAction = (result) => ({
  type: REGISTRATION_SUCCESS,
  payload: result,
});

export const registrationFailureAction = () => ({
  type: REGISTRATION_FAILURE
});

export const authenticationRequestAction = () => ({
  type: AUTHENTICATION_REQUEST
});

export const authenticationSuccessAction = (result) => ({
  type: AUTHENTICATION_SUCCESS,
  payload: result,
});

export const authenticationSuccessErrorAction = (result) => ({
  type: AUTHENTICATION_SUCCESS_ERRORS,
  payload: result
});

export const authenticationFailureAction = () => ({
  type: AUTHENTICATION_FAILURE
});

export const restartUserRequestAction = () => ({
  type: RESTART_USER_REQUEST
});

export const restartUserSuccessAction = (user) => ({
  type: RESTART_USER_SUCCESS,
  payload: user,
});
  
export const restartUserFailureAction = () => ({
  type: RESTART_USER_FAILURE
});
  

export const getCurrentUserRequestAction = () => ({
  type: GET_CURRENT_USER_REQUEST
});


export const getCurrentUserSuccessAction = (user) => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: user
});

export const updateUserRequestAction = () => ({
  type: UPDATE_USER_REQUEST
});

export const updateUserFailureAction = () => ({
  type: UPDATE_USER_FAILURE
});