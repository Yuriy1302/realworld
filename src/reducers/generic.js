const initialState = {
  loader: false,
  error: false,
  serverErrors: null,
  errorsResponse: null,
  pageCurrent: 1,
};

const genericReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'RESET_ERRORS_RESPONSE':
      return {
        ...state,
        errorsResponse: null
      }
    
    case 'UPDATE_USER_REQUEST':
      return {
        ...state,
        loader: true,
        error: false
      }
    
    case 'GET_ARTICLES_REQUEST':
    return {
      ...state,
      loader: true,
      error: false
    };
    
  case 'GET_ARTICLES_SUCCESS':
    return {
      ...state,
      loader: false,
      error: false,        
    };

  case 'GET_ARTICLES_FAILURE':
    return {
      ...state,
      loader: false,
      error: true
    };

  case 'TOGGLE_PAGE':
    return {
      ...state,
      pageCurrent: action.payload
    };

  case 'GET_ONE_ARTICLE_REQUEST':
    return {
      ...state,
      loader: true
    }
  case 'GET_ONE_ARTICLE_SUCCESS':
    return {
      ...state,
      loader: false,
    };

    /* Регистрация */
  case 'REGISTRATION_REQUEST':
    return {
      ...state,
      loader: true
    };
  case 'REGISTRATION_SUCCESS':
    return {
      ...state,
      loader: false,
      serverErrors: null,
    };
  case 'REGISTRATION_FAILURE':
    return {
      ...state,
      loader: false,
      error: true
    }

  case 'REGISTRATION_ERRORS':
    return {
      ...state,
      loader: false,
      error: false,
      serverErrors: action.payload ? action.payload : {} // ???
    }
  /* Аутентификация */
  case 'AUTHENTICATION_REQUEST':
    return {
      ...state,
      loader: true
    }

  case 'AUTHENTICATION_SUCCESS':
    return {
      ...state,
      loader: false
    }

  case 'AUTHENTICATION_SUCCESS_ERRORS':
    return {
      ...state,
      loader: false,
      errorsResponse: action.payload.errors
    }

  case 'AUTHENTICATION_FAILURE':
    return {
      ...state,
      loader: false,
      error: true
    }

  case 'GET_CURRENT_USER_REQUEST':
    return {
      ...state,
      loader: true,
      error: false
    }

  case 'GET_CURRENT_USER_SUCCESS':
    return {
      ...state,
      loader: false,
      error: false
    }


    case 'ADD_FAVORITE_ARTICLE_REQUEST': {
      return {
        ...state,
        loader: false,
        error: false,
      }
    }

    case 'ADD_FAVORITE_ARTICLE_SUCCESS': {
      return {
        ...state,
        loader: false,
        error: false,
      }
    }

    case 'UNFAVORITE_ARTICLE_REQUEST': {
      return {
        ...state,
        loader: false,
        error: false
      }
    }

    case 'UNFAVORITE_ARTICLE_SUCCESS': {
      return {
        ...state,
        loader: false,
        error: false
      }
    }

    default:
      return state;
  };
};

export default genericReducer;