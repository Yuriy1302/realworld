import {
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,

  GET_SINGLE_ARTICLE_SUCCESS,
  GET_SINGLE_ARTICLE_FAILURE,

  ADD_FAVORITE_ARTICLE_REQUEST,
  ADD_FAVORITE_ARTICLE_SUCCESS,
  // ADD_FAVORITE_ARTICLE_FAILURE,

  UNFAVORITE_ARTICLE_REQUEST,
  UNFAVORITE_ARTICLE_SUCCESS,
  // UNFAVORITE_ARTICLE_FAILURE,

} from '../actions/articles';

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
      const { articles } = state;
      const slug = action.payload;
      const index = articles.findIndex((item) => item.slug === slug);
      const oldArticle = articles[index];
      const newArticle = { ...oldArticle, favorited: true, favoritesCount: oldArticle.favoritesCount + 1 };
      const newArticles = [...articles.slice(0, index), newArticle, ...articles.slice(index + 1)];
      return {
        ...state,
        article: newArticle,
        articles: newArticles
      }
    }
      
    case ADD_FAVORITE_ARTICLE_SUCCESS: {
      const { articles } = state;
      const { favorited, favoritesCount, slug } = action.payload;
      const index = articles.findIndex((item) => item.slug === slug);
      const oldArticle = articles[index];
      const newArticle = { ...oldArticle, favorited, favoritesCount };
      const newArticles = [...articles.slice(0, index), newArticle, ...articles.slice(index + 1)];
      return {
        ...state,
        article: action.payload,
        articles: newArticles
      }
    }

    case UNFAVORITE_ARTICLE_REQUEST: {
      const { articles } = state;
      const slug = action.payload;
      const index = articles.findIndex((item) => item.slug === slug);
      const oldArticle = articles[index];
      const newArticle = { ...oldArticle, favorited: false, favoritesCount: oldArticle.favoritesCount - 1 };
      const newArticles = [...articles.slice(0, index), newArticle, ...articles.slice(index + 1)];
      return {
        ...state,
        article: newArticle,
        articles: newArticles
      }
    }

    case UNFAVORITE_ARTICLE_SUCCESS: {
      const { articles } = state;
      const { favorited, favoritesCount, slug } = action.payload;
      const index = articles.findIndex((item) => item.slug === slug);
      const oldArticle = articles[index];
      const newArticle = { ...oldArticle, favorited, favoritesCount };
      const newArticles = [...articles.slice(0, index), newArticle, ...articles.slice(index + 1)];
      return {
        ...state,
        article: action.payload,
        articles: newArticles
      }
    }

    default:
      return state;
      
  };
};

export default articlesReducer;
