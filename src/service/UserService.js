import { ApiService } from './ApiService';

export class UserService {

  static async registration(data) {
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
  }

  static async authentication(userRegister) {
    const result = await ApiService.request(
      '/users/login',
      'POST',
      undefined,
      {
        user: {
          email: userRegister.email,
          password: userRegister.password
        }
      }
    );
    return result;
  }

  static async updateUser(token, newData) {
    const result = await ApiService.request(
      '/user',
      'PUT',
      { Authorization: `Token ${token}`},
      { user: newData }
    );
    return result;
  }

  static async getCurrentUser(token) {
    const result = await ApiService.request(
      '/user',
      'GET',
      { Authorization: `Token ${token}`}
    );
    console.log('result getCurrentUser: ', result);
    return result;
  }

  static async restartUser(token) {
    const result = await ApiService.request(
      '/user',
      'GET',
      { Authorization: `Token ${token}`}
    );
    console.log('result restartUser: ', result);
    return result;
  }




}