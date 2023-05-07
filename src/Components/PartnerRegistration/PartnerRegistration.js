import React, { useEffect, useState } from 'react'
import './PartnerRegistration.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios, { unAuthInstance } from '../../axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import OtpInput from 'react-otp-input';
import 'react-toastify/dist/ReactToastify.css';
import { fontSize } from '@mui/system';


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

function PartnerRegistration() {
  const [confirmPass,setConfirmPass] = useState('')
  const [matchPass,setMatchPass] = useState(false)
  
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const [arenaName,setArenaName] = useState('')
  const [phone,setPhone] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [verify, setVerify] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const data = {
    name:arenaName,
    phone:phone,
    email:email,
    password:password,
    is_partner:true 
  }
  useEffect(()=>{
    console.log(matchPass);
  if(password===confirmPass){
      setMatchPass(true)
      
    }
    else{
      setMatchPass(false)
    }
  },[password,confirmPass])
  
  const passError = "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
  let nameError = "Name must be atleast 3 characters long"
  let phoneError = "Enter valid phone number"
  let mailError = "Enter valid E-mail address"
  
  const [otp, setOtp] = useState('');
  const initiateVerify = async (event)=>{
    event.preventDefault()
    setOpen(true)
    const phoneData ={phone:phone}
      await unAuthInstance.post('accounts/api/initiate-verify/',phoneData).then((res)=>{
        toast("sent otp to your phone")
        setLoading(false)
        setOpen(true)
      }).catch((err)=>{
        console.log(err);
        toast.error(err)
      })
  }

  const styleObj = {
    color: "green",
}
  const register = async ()=>{
    setLoading(true)
    
    if (arenaName.length!==0 &&phone.length!==0&&email.length!==0&&password.length!==0){
      
      if(verify===false){
        setOpen(true)
        toast.error("verify mobile first")
      }
      else{
      
      console.log(data)
      await unAuthInstance.post('accounts/api/register/',data).then((res)=>{
        if (res.status===200){
          console.log(res)
          toast.success("Registered Successfully")
          setLoading(false)
          navigate('/partner_login')
        }
        else{
          console.log(res.error);
        }
      }).catch((err)=>{
        toast.error({err})
      })}
    }
    else{
      toast.error("Fill all the fields");
      
    }
  }
  const verifyMobile = async(e)=>{
    setOpen(false)
    // e.preventDefault()
    if (otp.length!==0){
      const otpData = {
        phone_number : phone,
        code : otp
      }
      console.log(otpData);
        await unAuthInstance.post('accounts/api/verify-user/',otpData).then((res)=>{
          console.log(res.data);
          if (res.status === 200){
            setVerify(true)
            setLoading(false)
            register()
          }

        }).catch((err)=>{
          console.log(err);
          toast.error("Something went wrong")
        })
      }else{
        toast.error("Enter the OTP")
      }


  }
  
  return (
    <div><div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
          <Button className="otp-modal-button" onClick={verifyMobile}>verify</Button>{loading&&"processing..."}
        </Box>
      </Modal>
    <div className="register-head-card">
      <div className="register_title">
        <p>Register your sports hub</p>
      </div>
    </div>
    <div className="register-part-card">
      <div className="">
        <form className = "register-form" onSubmit={initiateVerify} action="">
          <input type="text" pattern="[A-Za-z]{2,32}" value={arenaName} onChange={(e)=>{setArenaName(e.target.value)
          setLoading(false)}} name="arena-name" id="" placeholder='Arena Name'/>
          <span>{nameError}</span>
          <input type="tel" pattern="[0-9]{10}" value={phone} onChange={(e)=>{setPhone(e.target.value)
        setLoading(false)}} name="phone" id="" placeholder='Phone'/>
          <span>{phoneError}</span>
          <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"  value={email} onChange={(e)=>{setEmail(e.target.value)
          setLoading(false)}} name="email" id="" placeholder='Email'/>
          <span>{mailError}</span>
          <input type={showPassword ? "text" : "password"} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password} onChange={(e)=>{setPassword(e.target.value)
          setLoading(false)}} name="password" id="" placeholder='Password'/><p style={{fontSize:'10px',marginLeft:'1rem', cursor:'pointer'}} onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide Password" : "Show Password"}
        </p>
          <span>{passError}</span>
          <input type="text" value={confirmPass} onChange={(e)=>{setConfirmPass(e.target.value)}}  name="confirm-password" id="" placeholder='Confirm Password'/>
          <span>{matchPass ? <p style={styleObj}>"Passwords Match"</p> : "Passwords do not match"}</span>
          <button type="submit" className="register-button" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
          {/* <input type="submit" value="Register" /> */}
        </form>
      </div>
    </div>
  </div></div>
  )
}

export default PartnerRegistration