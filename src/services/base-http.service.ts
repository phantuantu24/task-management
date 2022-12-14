import axios, { AxiosResponse } from 'axios';

export default class BaseHttpService {
  BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
  _accessToken: string | null = null;

  async get(endpoint: string, options: object = {}): Promise<void | AxiosResponse<any, any>> {
    Object.assign(options, this._getCommonOptions());
    return axios.get(`${this.BASE_URL}/${endpoint}`, options)
      .catch(error => this._handleHttpError(error));
  }

  async post(endpoint: string, data: object = {}, options: object = {}): Promise<void | AxiosResponse<any, any>> {
    Object.assign(options, this._getCommonOptions());
    return axios.post(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch(error => this._handleHttpError(error));
  }

  async delete(endpoint: string, options: object = {}): Promise<void | AxiosResponse<any, any>> {
    Object.assign(options, this._getCommonOptions());
    return axios.delete(`${this.BASE_URL}/${endpoint}`, options)
      .catch(error => this._handleHttpError(error));
  }

  async patch(endpoint: string, data: object = {}, options: object = {}): Promise<void | AxiosResponse<any, any>> {
    Object.assign(options, this._getCommonOptions());
    return axios.patch(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch(error => this._handleHttpError(error));
  }

  _handleHttpError(error: any): void {
    const { statusCode } = error.response.data;

    if (statusCode !== 401) {
      throw error;
    } else {
      return this._handle401();
    }
  }

  _handle401() {
    window.location.href = '/signin';
  }

  _getCommonOptions() {
    const token = this.loadToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  get accessToken() {
    return this._accessToken ? this._accessToken : this.loadToken();
  }

  saveToken(accessToken: string): void {
    this._accessToken = accessToken;
    return localStorage.setItem('accessToken', accessToken);
  }

  loadToken() {
    const token = localStorage.getItem('accessToken');
    this._accessToken = token;
    return token;
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }
}
