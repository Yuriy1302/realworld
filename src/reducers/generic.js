import {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,

  GET_SINGLE_ARTICLE_REQUEST,
  GET_SINGLE_ARTICLE_SUCCESS,
  GET_SINGLE_ARTICLE_FAILURE,

  ADD_FAVORITE_ARTICLE_FAILURE,

  UNFAVORITE_ARTICLE_FAILURE,

  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_FAILURE,

  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_FAILURE,
  
} from '../actions/articles';

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


} from '../actions/user';

import {
  TOGGLE_PAGE,
  RESET_ERRORS_RESPONSE,


} from '../actions/generic';

const initialState = {
  loader: false,
  error: false,
  serverErrors: null,
  errorsResponse: null,
  pageCurrent: 1,
};

const genericReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ARTICLES_REQUEST:
      return {
        ...state,
        loader: true,
        error: false
      };
      
    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        loader: false,
        error: false,        
      };
  
    case GET_ARTICLES_FAILURE:
      return {
        ...state,
        loader: false,
        error: true
      };
    
    case GET_SINGLE_ARTICLE_REQUEST:
      return {
        ...state,
        loader: true
      }

    case GET_SINGLE_ARTICLE_SUCCESS:
      return {
        ...state,
        loader: false,
      };

    case GET_SINGLE_ARTICLE_FAILURE:
      return {
        ...state,
        loader: false,
        error: true
      };

    case ADD_FAVORITE_ARTICLE_FAILURE:
      return {
        ...state,
        loader: false,
        error: true
      };
    
    case UNFAVORITE_ARTICLE_FAILURE:
      return {
        ...state,
        loader: false,
        error: true
      }
    

    case CREATE_ARTICLE_REQUEST:
      return {
        ...state,
        loader: true
      };

    case CREATE_ARTICLE_FAILURE:
      return {
        ...state,
        loader: false,
        error: true
      };
    
    case UPDATE_ARTICLE_REQUEST:
      return {
        ...state,
        loader: true
      };

    case UPDATE_ARTICLE_FAILURE:
      return {
        ...state,
        loader: false,
        error: true
      };

  /* Регистрация */
  case REGISTRATION_REQUEST:
    return {
      ...state,
      loader: true
    };
  case REGISTRATION_SUCCESS:
    return {
      ...state,
      loader: false,
      serverErrors: null,
    };
  case REGISTRATION_FAILURE:
    return {
      ...state,
      loader: false,
      error: true
    }
  
  case REGISTRATION_ERRORS:
    return {
      ...state,
      loader: false,
      error: false,
      serverErrors: action.payload ? action.payload : {} // ???
    }

/* Аутентификация */
case AUTHENTICATION_REQUEST:
  return {
    ...state,
    loader: true
  }

case AUTHENTICATION_SUCCESS:
  return {
    ...state,
    loader: false
  }

case AUTHENTICATION_SUCCESS_ERRORS:
  return {
    ...state,
    loader: false,
    errorsResponse: action.payload.errors
  }

case AUTHENTICATION_FAILURE:
  return {
    ...state,
    loader: false,
    error: true
  }

  case RESTART_USER_REQUEST:
    return {
      ...state,
      loader: true,
      error: false
    }
  
  case RESTART_USER_SUCCESS:
    return {
      ...state,
      loader: false,
      error: false
    }
  
  case RESTART_USER_FAILURE:
    return {
      ...state,
      loader: false,
      error: true
    }

  case GET_CURRENT_USER_REQUEST:
    return {
      ...state,
      loader: true,
      error: false
    }

  case GET_CURRENT_USER_SUCCESS:
    return {
      ...state,
      loader: false,
      error: false
    }
    
  case UPDATE_USER_REQUEST:
    return {
      ...state,
      loader: true,
    }
  
  case UPDATE_USER_FAILURE:
    return {
      ...state,
      loader: false,
      error: true
    }


    case TOGGLE_PAGE:
      return {
        ...state,
        pageCurrent: action.payload
      };

    case RESET_ERRORS_RESPONSE:
      return {
        ...state,
        errorsResponse: null
      }

    default:
      return state;
  };
};

export default genericReducer;
