import { ApiService } from './ApiService';

export class ArticleService {

  static async getArticlesList(offset, token) {
    const headers = token
      ? { Authorization: `Token ${token}` }
      : undefined;
    const result = await ApiService.request(
      `/articles?offset=${offset}`,
      'GET',
      headers
    );
    return result;
  }

  static async getMyselfArticles(author, offset) {
    const result = await ApiService.request(
      `/articles?author=${author}&offset=${offset}`,
      'GET'
    );
    return result;
  }

  static async getSingleArticle(slug, token) {
    const headers = token
      ? { Authorization: `Token ${token}` }
      : undefined;
    const result = await ApiService.request(
      `/articles/${slug}`,
      'GET',
      headers
    );
    return result.article;
  }

  static async createArticle(newArticle, token) {
    const result = await ApiService.request(
      '/articles',
      'POST',
      { Authorization: `Token ${token}` },
      {
        article: {
          title: newArticle.title,
          description: newArticle.description,
          body: newArticle.body,
          tagList: newArticle.tagsList,              
        }
      }
    );
    return result;
  }

  




}

/* static async registration(data) {
  const body = {
    user: {
      username: data.username,
      email: data.email,
      password: data.password
    }
  };
  const result = await ApiService.request(
    '/users',
    'POST',
    undefined,
    body
  );
  return result;
} */