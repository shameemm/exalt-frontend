import React, { useContext, useEffect, useState } from 'react'
import './AdminLogin.css'
import jwt_decode from 'jwt-decode'
import axios, { unAuthInstance } from '../../axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

function AdminLogin() {
    let passError = "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
    let mailError = "Enter valid E-mail address"
    const navigate = useNavigate()
    const {token,setTokens}=useContext(UserContext)
    useEffect(()=>{
        const token = localStorage.getItem('refresh')
        if (token){
            navigate('/admin-home')
        }
    },[navigate])
    const [email,setEmail]= useState('')
    const [password,setPassword] = useState('')
    const data = {
        email:email,
        password:password,
    }
    console.log(data);
    const login = async (e)=>{
        e.preventDefault()
        if (email.lenght!=0 && password.length!=0){
        await unAuthInstance.post('accounts/api/admin_login/',data).then((res)=>{
            if (res.status ===200){
                console.log(res.data.refresh);
                const code = jwt_decode(res.data.refresh)
                console.log(code);
                if (code.is_superuser === true){
                
                    localStorage.setItem('token',JSON.stringify(res.data))
                    localStorage.setItem('refresh',res.data.refresh)
                    localStorage.setItem('access',res.data.access)
                    setTokens(res.data.refresh)
                    navigate('/admin-home')
                }
                else{
                    alert('You are not an admin')
                }
            }
            

        })}
        else{
            alert("Enter the Data")
        }
    }
  return (
    <div>
        <div className="admin-login-card">
            <div className="admin-login-card-header">
                <h2>Admin Login</h2>
            </div>
            <div className="admin-login-card-body">
                <form className='admin-login-form' action="" onSubmit={login}>
                    <input type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" value={email} onChange={(e)=>{setEmail(e.target.value)}} name="email" id="" placeholder='Email'/>
                    <span>{mailError}</span>
                    <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" id="" placeholder='Password' />
                    <span>{passError}</span>
                    <input type="submit" value="Login" />
                </form>
            </div>

        </div>
    </div>
  )
}

export default AdminLogin