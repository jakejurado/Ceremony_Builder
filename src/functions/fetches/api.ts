import React from 'react';

class Cache {
  cache: {
    [key: string] : any 
  } | undefined

  constructor(){
    this.cache = {}
  }

  inCache(search: string): boolean{
    return this.cache.hasOwnProperty(search)
  }

  addToCache(search: string, data: any): void{
    this.cache[search] = data
  }
}


class BaseAPI extends Cache{
  url : string;
  headers : {[key: string]: string};
  path : {
    [key: string]: string
  }

  constructor(url) {
    super();
    this.url = url;
    this.headers = {'Content-Type': 'application/json'};
    this.path = {
      login : `user/login`,
      signup: 'user/signup',
      signout: 'user/signout',
      delete: 'user/signup',
      reset: 'user/signup',
      verify: 'user/verify',
      forgot: 'user/forgot',
      titles: 'sections/titles',
      grabSec: 'sections/grab',
      templates: 'templates/userTemplate',
      allTemplates: 'templates/all',
      access: '/user/access'
    }
  }

  createParams(obj: { [key: string]: string | number }): string {
    let url = '';
    Object.entries(obj).forEach((set, index) => {
      const [key, value] = set;
      const sym = index === 0 ? '/?' : '&';
      url += `${sym}${key}=${encodeURIComponent(value)}`;
    });
    return url;
  }

  async get(endpoint: string, params: { varname?: string, userId?: number } | false = false): Promise<any>{
      //grab cached data
    if(params && params.varname && this.inCache(params.varname)){
      return this.cache[params.varname]
    }
      //fetch data
    let url: string = this.path[endpoint];
    if(params) url += this.createParams(params)
    const options = {
      method: "GET", 
      headers: this.headers
    };
    try {
      const res = await fetch(url, options)
      const data = await res.json();
        //cache the data
      if(params && params.varname) this.addToCache(params.varname, data)
      return data
    } catch(err){
      console.error('error in API')
      return false
    }
  } 

  async post(endpoint: string, body: {[key: string]: string | number}): Promise<any>{
    const url: string = this.path[endpoint];
    const options = {
      method: "POST", 
      headers: this.headers,
      body: JSON.stringify(body)
    };
    try{
      const res = await fetch(url, options)
      const data = await res.json();
      return data
    } catch(err){
      console.log(err)
    }
  } 

  async put(endpoint: string, body: { [key: string]: string | number}): Promise<any> {
    const url: string = this.path[endpoint]
    const options = {
      method: "PUT", 
      headers: this.headers,
      body: JSON.stringify(body)
    };
    
    try{
      const res = await fetch(url, options)
      const data = await res.json();
      return data
    } catch(err){
      console.log('error in put', err)
      return {isPasswordReset: false}
    }
  } 

  async delete(endpoint: string, params: {[key: string]: string | number}): Promise<any>{
    let url: string = this.path[endpoint];
    if(params) url += this.createParams(params)
    const options = {
      method: "DELETE", 
      headers: this.headers,
    };
    try{
      const res = await fetch(url, options)
      return res.ok
    } catch(err){
      console.log('unable to delete', err)
    }
  }
}

const fetchCall = new BaseAPI('');

export {fetchCall, BaseAPI}

