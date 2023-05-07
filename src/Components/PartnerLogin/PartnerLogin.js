import React,{useState, useEffect,useContext} from 'react'
import jwt_decode from 'jwt-decode'
import axios,{ unAuthInstance } from '../../axios'
import './PartnerLogin.css'
import { UserContext } from '../../Context/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
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

function PartnerLogin() {
    const navigate = useNavigate()
    let passError = "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
    let mailError = "Enter valid E-mail address"
    const [loading,setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phone,setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [refresh,setRefresh] = useState('')
    const [access,setAccess] = useState('')
    const [error,setError] = useState('')
    const {token,setTokens}=useContext(UserContext)
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token){
            navigate("/partner-home")
        }
    },[navigate])

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
        console.log(otp);
        const otpData = {
            phone_number : phone,
            code : otp
        }
        if (otp.length!==0){
        await unAuthInstance.post('accounts/api/verify-partner-login-otp/',otpData).then((res)=>{
            console.log("res",res);
            if (res.status===200){
                console.log(res.data);
                const code = jwt_decode(res.data.refresh)

                console.log(code);
                if (code.is_partner === true){
                    localStorage.setItem('token',JSON.stringify(res.data))
                    localStorage.setItem('access',res.data.access)
                    // localStorage.setItem('user',res.data.user)
                    // setRefresh(res.data.refresh)
                    // setAccess(res.data.access)
                    // setError(res.data.error)
                    // setTokens(res.data.refresh)
                    navigate('/partner-home')
                    setLoading(false)
                }
                else{
                    toast.error('You are not a partner')
                    setLoading(false)
                }
            }
            else if(res.data.status===401){
                alert("Enter the valid username and password")
                setLoading(false)
            }
            else{
                toast.error("Something went wrong")
                setLoading(false)
            }
        }).catch((err)=>{
            console.log(err);
            toast.error("Something went wrong")
            // if( err.response.status===401){
            //     toast.error("Enter the valid username and password")
            //     setLoading(false)
            // }
        })
    }else{
        toast.error("OTP required")
    }

    }

    const loginPartner = async (e)=>{
        setLoading(true)
        e.preventDefault()
        const data = {
            email:email,
            password:password
        }
        console.log(data);
        if (data.email.length!=0 && data.password.length!=0){
        await unAuthInstance.post('accounts/api/login/',data).then((res)=>{
            console.log("res",res);
            if (res.status===200){
                console.log(res.data);
                const code = jwt_decode(res.data.refresh)
                console.log(code.is_partner);
                if (code.is_partner === true){
                    localStorage.setItem('token',JSON.stringify(res.data))
                    localStorage.setItem('access',res.data.access)
                    // localStorage.setItem('user',res.data.user)
                    // setRefresh(res.data.refresh)
                    // setAccess(res.data.access)
                    // setError(res.data.error)
                    // setTokens(res.data.refresh)
                    navigate('/partner-home')
                    setLoading(false)
                }
                else{
                    toast.error('You are not a partner')
                    setLoading(false)
                }
            }
            else if(res.data.status===401){
                alert("Enter the valid username and password")
                setLoading(false)
            }
            else{
                toast.error("Something went wrong")
                setLoading(false)
            }
        }).catch((err)=>{
            console.log(err);
            toast.error("Something went wrong")
            // if( err.response.status===401){
            //     toast.error("Enter the valid username and password")
            //     setLoading(false)
            // }
        })
    }
        else{
            toast.error("Enter username and password")
            setLoading(false)
        }
    }
  return (
    <div className='partner-login-container'>
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
                <p>Login as Partner</p>
                <p className="dont-have-account">Connect your hub with us..<u> Register</u></p>
            </div>
            <div className="user-login-form">
                <form action="" onSubmit={loginPartner}>
                    <input type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" value={email} onChange={(e)=>{setEmail(e.target.value);setLoading(false)}} placeholder='Username' />
                    <span>{mailError}</span>
                    <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password} onChange={(e)=>{setPassword(e.target.value);setLoading(false)}} placeholder='Password' />
                    <span>{passError}</span>
                    <div className="user-login-button">
                        <div className="or-signin">
                            <p>Or Login with - </p>
                             <img src="/icons/facebook.png" alt="" />
                             <img src="/icons/google.png" alt="" />
                        </div>
                        <button type="submit" disabled={loading}>{loading?"loading...": "Login"}</button>
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

export default PartnerLogin