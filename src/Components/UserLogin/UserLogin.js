import React, { useContext, useEffect, useState } from 'react'
import './UserLogin.css'
import {Link, useNavigate} from 'react-router-dom'
import axios,{unAuthInstance} from '../../axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { UserContext } from '../../Context/UserContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import OtpInput from 'react-otp-input'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '.5px solid #000',
    borderRadius:'10px',
    boxShadow: 24,
    p: 4,
  };

function UserLogin() {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    let passError = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    let mailError = "Enter valid E-mail address"
    const [open, setOpen] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [ phone,setPhone] = useState('')
    const [otp,setOtp] = useState('')
    const [refresh,setRefresh] = useState('')
    const [access,setAccess] = useState('')
    const [error,setError] = useState('')
    const {token,setTokens}=useContext(UserContext)
    const onSuccess = (response) => {
        console.log(response);
      };
    
      const onFailure = (error) => {
        console.error(error);
      };
    useEffect(()=>{
        const token = localStorage.getItem('refresh')
        if (token){
            navigate("/")
        }
    },[navigate])
    console.log("tokens",token);

    const getOtp =async ()=>{
        const phoneData = {
            phone : phone,
        }
        await unAuthInstance.post('accounts/api/sent-otp-partner/',phoneData).then((res)=>{
            console.log(res.data);
            setOpen(true)
            toast("sent otp to your phone")
        }).catch((err)=>{
            toast.error(err.response.data.error)
        })
        

    }

    const otpLogin = async()=>{
        setLoading(true)
        const otpData = {
            phone_number : phone,
            code : otp
        }
        if (otp.length!==0){
            await unAuthInstance.post('accounts/api/verify-partner-login-otp/',otpData).then((res)=>{
                const code = jwt_decode(res.data.refresh)
                console.log(code);
                if (code.is_partner === false && code.is_active === true){
                    localStorage.setItem('token',JSON.stringify(res.data))
                    localStorage.setItem('access',res.data.access)
                    localStorage.setItem('user',res.data.user)
                    setRefresh(res.data.refresh)
                    setAccess(res.data.access)
                    setError(res.data.error)
                    setTokens(res.data.refresh)
                    navigate('/')
                    setLoading(false)
                }
                else{
                    toast.error('You are not a user')
                    setLoading(false)
                }  
            }).catch((err)=>{
                if( err.response.status===401){
                    toast.error("Enter the valid username and password")
                    setLoading(false)
                }
                setLoading(false)
            })
        }
    }

    const login = async (e)=>{
        setLoading(true)
        e.preventDefault()
        const data = {
            email:email,
            password:password
        }
        console.log(data)
        if (email.length != 0 && password.length !=0){
        await unAuthInstance.post('accounts/api/login/',data).then((res)=>{
            if (res.status===200){
                const code = jwt_decode(res.data.refresh)
                console.log(code.is_partner);
                if (code.is_partner === false && code.is_active === true){
                    localStorage.setItem('token',JSON.stringify(res.data))
                    localStorage.setItem('access',res.data.access)
                    localStorage.setItem('user',res.data.user)
                    setRefresh(res.data.refresh)
                    setAccess(res.data.access)
                    setError(res.data.error)
                    setTokens(res.data)
                    navigate('/')
                    setLoading(false)
                }
                else{
                    toast.error('You are not a user')
                    setLoading(false)
                }  
            }
            
        }).catch((err)=>{
            if( err.response.status===401){
                toast.error("Enter the valid username and password")
                setLoading(false)
            }
            setLoading(false)
        })
    }
        else{
            toast.error("Enter the valid Username And Password")
            setLoading(false)
        }
    }
    
  return (
    <div>
        <ToastContainer/>
        <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h5>Enter the OTP sent to +91{phone} </h5>
        <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
          <Button className="otp-modal-button" onClick={otpLogin}>verify</Button>{loading&&"processing..."}
        </Box>
      </Modal>
        <div className="container">
            <div className="user-login-title">
                <p>Login as User</p>
                <p className="dont-have-account">Don't have an account? <Link className='link-register' style={{color:'#fff', marginRight:'1px'}} to="/register"><p>Sign-Up</p></Link></p>
            </div>
            <div className="user-login-form">
                <form action="" >
                    <input type="email" name="email" value={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"  onChange={(e)=>{setEmail(e.target.value)}} id="" placeholder='E-mail'/>
                    <span>{mailError}</span>
                    <input type="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password} onChange={(e)=>{setPassword(e.target.value)}} id="" placeholder='Password'/>
                    <span>{passError}</span>
                    <div className="user-login-button">
                        <div className="or-signin">
                            <p>Or Login with - </p>
                            <GoogleLogin
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            buttonText=""
                            cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <button onClick={login}disabled={loading}>{loading?"loading...": "Login"}</button>
                    </div>
                </form>
            </div>
            <div className="login-with-phone">
                <p>Or <u>Login with Phone</u></p>
                <input type="tel" pattern="[0-9]{10}" value={phone} onChange={(e)=>{setPhone(e.target.value)
                setLoading(false)}} name="phone" id="" placeholder='Phone'/>
                <button onClick={getOtp} disabled={loading}>{loading?"loading...": "Get OTP"}</button>
            </div>
        </div>
    </div>
  )
}

export default UserLogin