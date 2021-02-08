import {
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
  UPDATE_USER_FAILURE,
} from '../config/configUser';

import {
  RESET_ERRORS_RESPONSE,
} from '../config/configGeneric';

import {
  requestAction,
  successAction,
  failureAction
} from './reducerService';

const initialState = {
  loader: false,
  error: false,
  serverErrors: null,
  errorsResponse: null,
};

const genericUserReducer = (state = initialState, action) => {
  switch(action.type) {

    case REGISTRATION_REQUEST:
      return requestAction(state);

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        loader: false,
        serverErrors: null,
      };

    case REGISTRATION_FAILURE:
      return failureAction(state);
    
    case REGISTRATION_ERRORS:
      return {
        ...state,
        loader: false,
        error: false,
        serverErrors: action.payload ? action.payload : {} // ???
      }

    /* Аутентификация */
    case AUTHENTICATION_REQUEST:
      return requestAction(state);

    case AUTHENTICATION_SUCCESS:
      return successAction(state);

    case AUTHENTICATION_SUCCESS_ERRORS:
      return {
        ...state,
        loader: false,
        error: false,
        errorsResponse: action.payload.errors
      }

    case AUTHENTICATION_FAILURE:
      return failureAction(state);

    case RESTART_USER_REQUEST:
      return requestAction(state);
    
    case RESTART_USER_SUCCESS:
      return successAction(state);
    
    case RESTART_USER_FAILURE:
      return failureAction(state);

    case GET_CURRENT_USER_REQUEST:
      return requestAction(state);

    case GET_CURRENT_USER_SUCCESS:
      return successAction(state);
      
    case UPDATE_USER_REQUEST:
      return requestAction(state);
    
    case UPDATE_USER_FAILURE:
      return failureAction(state);
    
    case RESET_ERRORS_RESPONSE:
      return {
        ...state,
        errorsResponse: null
      };
    
    default:
      return state;
    };
};

export default genericUserReducer;
