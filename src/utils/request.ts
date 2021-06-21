import {apiRoot} from '../config/config';
import moment from 'moment';

async function parseJSON(response) {
  if (response.status === 204) {
    return undefined;
  }
  try {
    return await response.json();
  } catch (e) {
    console.log('error', e);
    return response;
  }
}

async function checkStaus(response) {
  let error;
  if (response.status < 200 || response.status >= 300) {
    error = new Error(response.statusText);
  } else if (response.status !== 200) {
    error = new Error('Response is not JSON');
  } else if (response.status === 403) {
    response.statusText = 'Something went wrong, Please try again.';
    error = new Error(response.statusText);
  }
  if (error) {
    error.response = response;
    throw error;
  }
  return response;
}
function responseErrorCallback(error) {
  console.log('responseErrorCallback:', error);
}
export default function request(url, option) {
  const controller = new AbortController();
  const signal = controller.signal;
  const _option = {...option, signal};
  return fetch(url, _option)
    .then(
      res => checkStaus(res),
      err => {
        console.log('rejected', err);
        responseErrorCallback(err);
      })
    .then(parseJSON);
}

const serialize = function(obj, prefix) {
  let str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};

const queryParams = function(params) {
  return Object.keys(params)
    .map(k => {
      if(params[k]) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
      }
    }).join('&');
};


export function get(url, data) {
  if (data) url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(data);
  return request(`${apiRoot}${url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: global.Authorization || undefined,
    },
  });
}

export function getWithHeader(url, auth) {
  return request(`${apiRoot}${url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth || undefined,
    },
  });
}

export function getWithData(url, auth, data) {
  return request(`${apiRoot}${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth || undefined,
    },
    body: serialize(data),
  });
}

export function getWithNoHeader(url) {
  return request(`${apiRoot}${url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export function post(url, postData) {
  return request(`${apiRoot}${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Authorization: global.Authorization || undefined,
    },
    body: serialize(postData),
  });
}

export function upload(url, data) {

  let myHeaders = new Headers();
  myHeaders.append("Authorization", global.Authorization || undefined);
  myHeaders.append("Content-Type", "application/json");

  const fileName = data.uri.substring(data.uri.lastIndexOf('/')+1);

  let formData = new FormData();

  formData.append('handle', data.handle);
  formData.append('comment', data.comment);
  formData.append('date', moment(data.date).format("MM/DD/YYYY HH:mm") || moment(new Date()).format("MM/DD/YYYY HH:mm"));
  formData.append('latitude', data.latitude);
  formData.append('longitude', data.longitude);
  formData.append('file', {
    uri: data.uri,
    type: data.mimeType,
    name: fileName
  });

  let opts = {
    method: 'POST',
    headers: myHeaders,
    body: formData
  };

  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', `${apiRoot}${url}`);
    for (let i in opts.headers || {})
      xhr.setRequestHeader(i, opts.headers[i]);
    xhr.onload = e => {
      return res(data);
    };
    xhr.onerror = error => {
      console.log('error', error);
      return rej(error);
    };
    if (xhr.upload) xhr.upload.onprogress = (progress) => {
    };
    xhr.send(opts.body);
  });
}
