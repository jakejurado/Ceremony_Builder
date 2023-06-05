import React from 'react';

class BaseAPI {
  constructor(url) {
    this.url = url;
    this.headers = {'Content-Type': 'application/json'};
    this.path = {
      login : `user/login`,
      signup: 'user/signup',
      verify: 'user/verify',
      forgot: 'user/forgot',
      delete: 'user/signup',
      reset: 'user/signup',
    }
  }
}

BaseAPI.prototype.createParams = function(obj, prefix){
  let url = prefix ? prefix : '';
  Object.entries(obj).forEach((set, index) => {
    const [key, value] = set;
    const sym = index === 0 ? '/?' : '&';
    url += `${sym}${key}=${value}`
  })
  return url;
}

BaseAPI.prototype.get = async function(endpoint, params){
  let url = this.createParams(params, this.path[endpoint])
  const options = {
    method: "GET", 
    headers: this.headers
  };
  try {
    const res = await fetch(url, options)
    const data = await res.json();
    return data
  } catch(err){
    console.log('error in API')
    return false
  }
} 

BaseAPI.prototype.post = async function(endpoint, body){
  const url = this.path[endpoint];
  const options = {
    method: "POST", 
    headers: this.headers,
    body: JSON.stringify(body)
  };
  const res = await fetch(url, options)
  const data = res.json();
  return data
} 

BaseAPI.prototype.put = async function(endpoint, body){
  const url = this.path[endpoint]
  const options = {
    method: "PUT", 
    headers: this.headers,
    body: JSON.stringify(body)
  };

  try{
    const res = await fetch(url, options)
    const data = await res.json();
    return data || {isPasswordReset: false}
  } catch(err){
    console.log('error in put', err)
    return {isPasswordReset: false}
  }
} 

BaseAPI.prototype.delete = async function(endpoint, params){
  const url = this.createParams(params, this.path[endpoint])
  const options = {
    method: "DELETE", 
    headers: this.headers,
  };
  try{
    const res = await fetch(url, options)
    const data = await res.json();
    return data
  } catch(err){
    console.log('unable to delete user')
  }
} 

const fetchCall = new BaseAPI('');

export {fetchCall}

