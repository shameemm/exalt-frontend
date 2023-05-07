import axios from 'axios'
import {baseUrl} from './Constant/Constant'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useState } from 'react'


let authTokens = localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null 
console.log(authTokens);

export const unAuthInstance = axios.create({
    
    baseURL : baseUrl,
})

const instance = axios.create({
    baseURL : baseUrl,
    headers : {Authorization: `Bearer ${authTokens!==null && authTokens.access}`}
})

instance.interceptors.request.use(async req => {
    if(!authTokens){
        authTokens = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
        req.headers.Authorization = `Bearer ${authTokens?.access}`
    }
    const user = jwt_decode(authTokens?.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log(dayjs.unix(user.exp));
    if(!isExpired) return req

    const response = await axios.post(`${baseUrl}accounts/api/login/refresh/`, {
        refresh: authTokens.refresh
      });

    localStorage.setItem('token', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
})

export default instance

