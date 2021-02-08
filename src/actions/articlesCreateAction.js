import {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
    
  GET_SINGLE_ARTICLE_REQUEST,
  GET_SINGLE_ARTICLE_SUCCESS,
  GET_SINGLE_ARTICLE_FAILURE,
    
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_FAILURE,
    
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_FAILURE,
    
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_FAILURE,
    
  ADD_FAVORITE_ARTICLE_REQUEST,
  ADD_FAVORITE_ARTICLE_SUCCESS,
  ADD_FAVORITE_ARTICLE_FAILURE,
    
  UNFAVORITE_ARTICLE_REQUEST,
  UNFAVORITE_ARTICLE_SUCCESS,
  UNFAVORITE_ARTICLE_FAILURE,
} from '../config/configArticle';


export const getArticlesRequestAction = () => ({
  type: GET_ARTICLES_REQUEST
});

export const getArticlesSuccessAction = ({articles, articlesCount}) => ({
  type: GET_ARTICLES_SUCCESS,
  payload: {
    /* articles: result.articles,
    articlesCount: result.articlesCount */
    articles,
    articlesCount
  }
});

export const getArticlesFailureAction = () => ({
  type: GET_ARTICLES_FAILURE
});

export const getSingleArticleRequestAction = () => ({
  type: GET_SINGLE_ARTICLE_REQUEST
});

export const getSingleArticleSuccessAction = (article) => ({
  type: GET_SINGLE_ARTICLE_SUCCESS,
  payload: article,
});

export const getSingleArticleFailureAction = () => ({
  type: GET_SINGLE_ARTICLE_FAILURE
});

export const createArticleRequestAction = () => ({
  type: CREATE_ARTICLE_REQUEST
});

export const createArticleFailureAction = () => ({
  type: CREATE_ARTICLE_FAILURE
})

export const updateArticleRequestAction = () => ({
  type: UPDATE_ARTICLE_REQUEST
});

export const updateArticleFailureAction = () => ({
  type: UPDATE_ARTICLE_FAILURE
});

export const deleteArticleRequestAction = () => ({
  type: DELETE_ARTICLE_REQUEST
});

export const deleteArticleFailureAction = () => ({
  type: DELETE_ARTICLE_FAILURE
});

export const setFavoriteArticleRequestAction = (slug) => ({
  type: ADD_FAVORITE_ARTICLE_REQUEST,
  payload: slug
});

export const setFavoriteArticleSuccessAction = (article) => ({
  type: ADD_FAVORITE_ARTICLE_SUCCESS,
  payload: article,
});

export const setFavoriteArticleFailureAction = () => ({
  type: ADD_FAVORITE_ARTICLE_FAILURE
});

export const deleteFavoriteArticleRequestAction = (slug) => ({
  type: UNFAVORITE_ARTICLE_REQUEST,
  payload: slug
});

export const deleteFavoriteArticleSuccessAction = (article) => ({
  type: UNFAVORITE_ARTICLE_SUCCESS,
  payload: article,
});

export const deleteFavoriteArticleFailureAction = () => ({
  type: UNFAVORITE_ARTICLE_FAILURE
});


