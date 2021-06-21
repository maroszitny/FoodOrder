import axios from 'axios';
import {apiRoot} from '../config/config';

class AxioRequest {
  authData: string = "";
  apiEndpoints: any;
  constructor() {
    // axios.defaults.baseURL = apiRoot;
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // axios.interceptors.response.use(AxioRequest.responseIntercepter, AxioRequest.errorIntercepter);
  }

  static responseIntercepter = (response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  };
  static errorIntercepter = (error) => {
    let errorResult = error;
    if (error.response && error.response.data && error.response.data.message) {
      errorResult = error.response.data.message;
    } else {
      errorResult = error.message;
    }
    return Promise.reject(errorResult);
  };

  static queryParams = function(params) {
    return Object.keys(params)
      .map(k => {
        if(params[k]) {
          return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
        }
      }).join('&');
  };

  static serialize = function(obj, prefix) {
    let str = [];
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          AxioRequest.serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  };

  setAuthData = (data) => {
    this.authData = data;
  };

  setEndpoints = (data) => {
    this.apiEndpoints = data;
  };

  get = (url, data) => {
    if (data) url += (url.indexOf('?') === -1 ? '?' : '&') + AxioRequest.queryParams(data);
    return axios.request({
      url: url,
      method: 'get',
      timeout: 10000,
      withCredentials: true,
      headers: {
        Authorization: this.authData,
      },
      responseType: 'json',
    });
  };

  getSerialize = (url, data) => {
    if (data) url += (url.indexOf('?') === -1 ? '?' : '&') + AxioRequest.serialize(data);
    return axios.request({
      url: url,
      method: 'get',
      timeout: 10000,
      withCredentials: true,
      headers: {
        Authorization: this.authData,
      },
      responseType: 'json',
    });
  };

  post = (url, postData) => {
    return axios.request({
      url: url,
      method: 'post',
      timeout: 10000,
      withCredentials: true,
      responseType: 'json',
      headers: {
        Authorization: this.authData,
      },
      data: AxioRequest.serialize(postData),
    });
  };
}
export const AxioRequestService = new AxioRequest();
