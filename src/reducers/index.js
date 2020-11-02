const initialState = {
  isLoggedIn: false,
  loader: false,
  error: false,
  errorsResponse: null,
  user: null,
  articles: [],
  articlesCount: null,
  pageCurrent: 1,
  article: {},
}

const reducer = (state = initialState, action) => {
  
  switch(action.type) {

    case 'LOG_IN':
      return { ...state, isLoggedIn: true };

    case 'LOG_OUT':
      return { ...state, isLoggedIn: false, user: null };

    case 'RESET_ERRORS_RESPONSE':
      return {
        ...state,
        errorsResponse: null
      }
    
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user
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
        articles: action.articles,
        articlesCount: action.articlesCount,
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
      console.log('action.article in reducer: ', action.article.author.username);
      return {
        ...state,
        loader: false,
        article: action.article
      };
    

    /* Аутентификация */
    case 'AUTHENTICATION_REQUEST':
      return { ...state, loader: true }

    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        loader: false,
        isLoggedIn: true,
        user: action.payload.user
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

    default:
      return state;
  }
}

export default reducer;