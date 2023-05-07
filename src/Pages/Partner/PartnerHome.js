import React, { useEffect } from 'react'
import Head from '../../Components/Head/Head'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import axios from '../../axios'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import TurfDetails from '../../Components/TurfDetail/TurfDetails'
import TurfDetailForm from '../../Components/TurfDetailForm/TurfDetailForm'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '1px solid #3F574E',
  borderRadius:'10px',
  boxShadow: 24,
  p: 4,
};
function PartnerHome() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const navigate = useNavigate()
const token = JSON.parse(localStorage.getItem('token'))
if( token!=null){
const decode = jwt_decode(token.access)
}
else{
  navigate('/partner_login')
}
useEffect(()=>{
   if (token != null){
  const decode = jwt_decode(token.access)
  if (decode.is_partner===false){
    navigate('/partner_login')
  }
  
}
else{

  navigate('/partner_login')
}
}
,[navigate])
useEffect(()=>{
  const decode = jwt_decode(token.access)
  
  axios.get(`http://127.0.0.1:8000/turf/get-details/${decode.user_id}/`).then((res)=>{
    console.log("res",res.data);
    if (res.data ===false){
      handleOpen()
    }
  },)
},[])
  return (
    <div>
      <Head></Head>
{/* 
      <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Grid container spacing = {0}>
        <Box sx={style}>
          <TurfDetailForm handleClose={handleClose}/>
        </Box>
        </Grid>
      </Modal>
        
        <TurfDetails open = {open}></TurfDetails>
    </div>
  )
}

export default PartnerHome