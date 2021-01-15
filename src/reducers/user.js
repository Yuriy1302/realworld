import {
  LOG_IN,
  LOG_OUT,
  REGISTRATION_SUCCESS,
  AUTHENTICATION_SUCCESS,
  RESTART_USER_SUCCESS,
  GET_CURRENT_USER_SUCCESS,
} from '../actions/user';

const initialState = {
  isLoggedIn: false,
  user: {},
  currentUser: {}
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true
      };

    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };

  /* Регистрация */
  case REGISTRATION_SUCCESS:
    return {
      ...state,
      isLoggedIn: true,
      user: action.payload.user
    };

  /* Аутентификация */
  case AUTHENTICATION_SUCCESS:
    return {
      ...state,
      isLoggedIn: true,
      user: action.payload.user
    }
  
  case RESTART_USER_SUCCESS:
    return {
      ...state,
      user: action.payload
    }

  case GET_CURRENT_USER_SUCCESS:
    return {
      ...state,
      currentUser: action.payload
    }

    default:
      return state;
  };
};

export default userReducer;
