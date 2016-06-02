/**
 * Request.js from https://github.com/soliury/noder-react-native
 */
import queryString from 'query-string';
import fetch from 'isomorphic-fetch';

var request = {}


const handleErrors = (res) => {
  if (res.ok) {
    return res
  } else {
    return res.json()
    .then((err) => {
      if (err.hasOwnProperty('non_field_errors')) {
        throw new Error(err.non_field_errors[0]);
      } else {
        throw new Error('An unknown error occurred')
      }
    });
  }
}


request.get = (url, params) => {
  if (params) {
    url += '?' + queryString.stringify(params)
  }
  return fetch(url)
    .then(handleErrors)
    .then(res=>res.json())
}

request.post = (url, body, jwt='') => {
  let fetchOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': jwt ? 'JWT ' + jwt : ''
    },
    body: JSON.stringify(body)
  }
  return fetch(url, fetchOptions)
    .then(handleErrors)
    .then(res=>res.json())
}


request.patch = (url, body, jwt='') => {
  let fetchOptions = {
    method: 'PATCH',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': jwt ? 'JWT ' + jwt : ''
    },
    body: JSON.stringify(body)
  }
  return fetch(url, fetchOptions)
    .then(handleErrors)
    .then(res=>res.json())
}


request.protectedGet = (url, jwt, params={}) => {
    if (params) {
        url += '?' + queryString.stringify(params)
    }
    var fetchOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': jwt ? 'JWT ' + jwt : ''
      }
    }
    return fetch(url, fetchOptions)
      .then(handleErrors)
      .then(res=>res.json())
}


module.exports = request
