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
} from '../config/configArticle';

import {
  TOGGLE_PAGE,
} from '../config/configGeneric';

import {
  requestAction,
  successAction,
  failureAction
} from './reducerService';

const initialState = {
  loader: false,
  error: false,
  pageCurrent: 1,
};

const genericArticleReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ARTICLES_REQUEST:
      return requestAction(state);
      
    case GET_ARTICLES_SUCCESS:
      return successAction(state);
  
    case GET_ARTICLES_FAILURE:
      return failureAction(state);
    
    case GET_SINGLE_ARTICLE_REQUEST:
      return requestAction(state);

    case GET_SINGLE_ARTICLE_SUCCESS:
      return successAction(state);

    case GET_SINGLE_ARTICLE_FAILURE:
      return failureAction(state);

    case ADD_FAVORITE_ARTICLE_FAILURE:
      return failureAction(state);
    
    case UNFAVORITE_ARTICLE_FAILURE:
      return failureAction(state);
    
    case CREATE_ARTICLE_REQUEST:
      return requestAction(state);

    case CREATE_ARTICLE_FAILURE:
      return failureAction(state);
    
    case UPDATE_ARTICLE_REQUEST:
      return requestAction(state);

    case UPDATE_ARTICLE_FAILURE:
      return failureAction(state);

    case TOGGLE_PAGE:
      return {
        ...state,
        pageCurrent: action.payload
      };
    
    default:
      return state;
  };
};

export default genericArticleReducer;
