import React from 'react'

import Grid from '@mui/material/Grid';

import Head from '../../Components/Head/Head'
import UserLogin from '../../Components/UserLogin/UserLogin'
import './Login.css'
import { GoogleLogin } from '@react-oauth/google';


function Login() {
  return (
    <div>
        <Head></Head>
        {/* <div className="login"> */}
        <Grid container spacing={3}>
          <Grid md={6} xs={12}>
            <div className="login-form-part">
            <UserLogin></UserLogin>
            </div>
           
          </Grid>
          
          <Grid md={6} xs={12} >
            <img class = "login-gif"src={"/images/gif/login.gif"} alt="" />
          </Grid>
        </Grid>
          
            
        {/* </div> */}
    </div>
  )
}

export default Login