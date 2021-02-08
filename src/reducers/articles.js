import {
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,

  GET_SINGLE_ARTICLE_SUCCESS,
  GET_SINGLE_ARTICLE_FAILURE,

  ADD_FAVORITE_ARTICLE_REQUEST,
  ADD_FAVORITE_ARTICLE_SUCCESS,

  UNFAVORITE_ARTICLE_REQUEST,
  UNFAVORITE_ARTICLE_SUCCESS,

} from '../config/configArticle';

const initialState = {
  articles: [],
  articlesCount: null,
  article: null
};


const articlesReducer = (state = initialState, action) => {
  switch(action.type) {

    case GET_ARTICLES_SUCCESS: {
      const { articles, articlesCount } = action.payload;
      return {
        ...state,
        articles,
        articlesCount,       
      };
    }

    case GET_ARTICLES_FAILURE:
      return {
        ...state,
        articles: [],
      };

    case GET_SINGLE_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload
      };

    case GET_SINGLE_ARTICLE_FAILURE:
      return {
        ...state,
        article: null,
      };

    case ADD_FAVORITE_ARTICLE_REQUEST: {
      const article = state.article;
      const slug = action.payload;
      const articles = state.articles.map((article) => (
        article.slug === slug
          ? { ...article, favorited: true, favoritesCount: article.favoritesCount + 1 }
          : article
        ));
      
      return {
        ...state,
        articles,
        article: article && { ...article, favorited: true, favoritesCount: article.favoritesCount + 1 }
      }
    }
      
    case ADD_FAVORITE_ARTICLE_SUCCESS: {

      const {favorited, favoritesCount, slug} = action.payload;
      const articles = state.articles.map((article) => (
        article.slug === slug
          ? { ...article, favorited, favoritesCount }
          : article
        ));
      
      return {
        ...state,
        articles,
        article: action.payload
      }
    }

    case UNFAVORITE_ARTICLE_REQUEST: {

      const article = state.article;
      const slug = action.payload;
      const articles = state.articles.map((article) => (
        article.slug === slug
          ? { ...article, favorited: false, favoritesCount: article.favoritesCount - 1 }
          : article
        ));
      
      return {
        ...state,
        articles,
        article: article && { ...article, favorited: false, favoritesCount: article.favoritesCount - 1 }
      }
    }

    case UNFAVORITE_ARTICLE_SUCCESS: {

      const {favorited, favoritesCount, slug} = action.payload;
      const articles = state.articles.map((article) => (
        article.slug === slug
          ? { ...article, favorited, favoritesCount }
          : article
        ));
      
      return {
        ...state,
        articles,
        article: action.payload
      }
    }

    default:
      return state;
      
  };
};

export default articlesReducer;
