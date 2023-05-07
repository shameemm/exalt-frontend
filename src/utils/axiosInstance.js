import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

const baseURL = 'http://127.0.0.1:8000'

let authTokens = localStorage.getItem('refresh')?JSON.parse(localStorage.getItem('refresh')):null