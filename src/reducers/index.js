const initialState = {
  isLoggedIn: false,
  loader: false,
  error: false,
  serverErrors: null,
  errorsResponse: null,
  user: {},
  currentUser: {},
  articles: [],
  articlesCount: null,
  pageCurrent: 1,
  article: null,
  liked: false,
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
    
    case 'UPDATE_USER_REQUEST':
      return {
        ...state,
        loader: true,
        error: false
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
        articles: [],
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
      /* console.log('action.article in reducer: ', action.article.author.username); */
      return {
        ...state,
        loader: false,
        article: action.article
      };
    
    /* Регистрация */
    case 'REGISTRATION_REQUEST':
      return {
        ...state, loader: true
      };
    case 'REGISTRATION_SUCCESS':
      return {
        ...state,
        loader: false,
        isLoggedIn: true,
        serverErrors: null,
        user: action.payload.user
      };
    case 'REGISTRATION_FAILURE':
      return {
        ...state,
        loader: false,
        error: true
      }

    case 'REGISTRATION_ERRORS':
      console.log('errors in reducer: ', action.payload);
      return {
        ...state,
        loader: false,
        error: false,
        serverErrors: action.payload ? action.payload : {}
      }





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
        error: false,
        currentUser: action.payload
      }
    
    /* case 'ADD_FAVORITE_ARTICLE_SUCCESS':
      return {
        ...state,
        loader: false,
        error: false,
        article: action.payload
      } */
    case 'ADD_FAVORITE_ARTICLE_SUCCESS': {
      const { articles } = state;
      // console.log('articles: ', articles);
      const { favorited, favoritesCount, slug } = action.payload;
      /* console.log('item[0]: ', articles[0].slug); */
      const index = articles.findIndex((item) => item.slug === slug);
      /* console.log('index: ', index); */
      const oldArticle = articles[index];
      // console.log('oldArticle: ', oldArticle);
      const newArticle = { ...oldArticle, favorited, favoritesCount };
      // console.log('newArticle: ', newArticle);
      const newArticles = [...articles.slice(0, index), newArticle, ...articles.slice(index + 1)];
      return {
        ...state,
        loader: false,
        error: false,
        article: action.payload,
        articles: newArticles
      }
    }

    case 'SET_LIKE':
      return {
        ...state,
        liked: true
      }

    case 'DELETE_LIKE':
      return {
        ...state,
        liked: false
      }
      







    default:
      return state;
  }
}

export default reducer;