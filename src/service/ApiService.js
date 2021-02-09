export class ApiService {
  static baseUrl = 'https://conduit.productionready.io/api';

  static async request(url, method = 'GET', headers = {}, body = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        ...headers
      },
      body: body && JSON.stringify(body)
    };

    try {
      const response = await fetch(`${this.baseUrl}${url}`, options);

      if (!response.ok && response.status === 422) {
        const errorResult = await response.json();
        /* throw new Error('Что-то пошло не так!'); */
        return errorResult;
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.log('Возникла ошибка (ApiService): ' + err);
    }
  }
}