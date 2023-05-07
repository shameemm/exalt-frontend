import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { unAuthInstance } from '../../axios'
import './UserRegistration.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import OtpInput from 'react-otp-input';

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

function UserRegistration() {
  const navigate = useNavigate()
  const [confirmPass,setConfirmPass] = useState('')
  const [matchPass,setMatchPass] = useState(false)
  const [name,setName] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otp,setOtp] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verify,setVerify] = useState(false)
  const data = {
    name:name,
    phone:phone,
    email:email,
    password:password,
    is_partner:false
  }
  const passError = "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
  let nameError = "Name must be atleast 3 characters long"
  let phoneError = "Enter valid phone number"
  let mailError = "Enter valid E-mail address"

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

  const register = async (e)=>{
    if (name.length!==0 &&phone.length!==0&&email.length!==0&&password.length!==0){
      if(phone!=="0000000000"){
      navigate('/login')
      console.log(data)
      await unAuthInstance.post('accounts/api/register/',data).then((res)=>{
        if (res.status===200){
          console.log(res)
         
        }
      })}
      else{
        toast.error("Enter valid Mobile number")
      }
    }
    else{
      toast.error("Please fill the fields")
    }
  } 
  const styleObj = {
    color: "green",
} 
  useEffect(()=>{
    if(password===confirmPass){
        setMatchPass(true)
      }
    },[password,confirmPass])  
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
          <Button className="otp-modal-button" onClick={verifyMobile}>verify</Button>{loading&&"processing..."}
        </Box>
      </Modal>
      <div className="register-head-card">
        <div className="register_title">
          <p>Register as User</p>
        </div>
      </div>
      <div className="register-part-card">
        <div className="">
          <form className = "register-form" onSubmit={initiateVerify} action="">
            <input type="text" name="name" value={name}  pattern="[A-Za-z]{2,32}" onChange={(e)=>{setName(e.target.value)}} id="" placeholder='Name' />
            <span>{nameError}</span>
            <input type="tel" name="phone" value = {phone} pattern="[0-9]{10}" onChange={(e)=>{setPhone(e.target.value)}} id="" placeholder='Phone'/>
            <span>{phoneError}</span>
            <input type="email" name="email" value={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"  onChange={(e)=>{setEmail(e.target.value)}} id="" placeholder='E-mail'/>
            <span>{mailError}</span>
            <div className="password-register">
            <input type="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password} onChange={(e)=>{setPassword(e.target.value)}} id="" placeholder='Password'/>
            <span>{passError}</span>
            {/* <i class="bi bi-eye-slash" id="togglePassword"></i> */}
            <input type="text" value={confirmPass} onChange={(e)=>{setConfirmPass(e.target.value)}}  name="confirm-password" id="" placeholder='Confirm Password'/>
          <span>{matchPass ? <p style={styleObj}>"Passwords Match"</p> : "Passwords do not match"}</span>
            </div>
            <input type="submit" value="Register" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserRegistration