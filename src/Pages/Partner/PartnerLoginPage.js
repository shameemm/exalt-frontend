import React,{useEffect} from 'react'
import Grid from '@mui/material/Grid';
import PartnerLogin from '../../Components/PartnerLogin/PartnerLogin'
import PartnerLoginBanner from '../../Components/PartnerLoginBanner/PartnerLoginBanner'
import Head from '../../Components/Head/Head'
import { useNavigate } from 'react-router-dom';
function PartnerLoginpage() {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (token){
        navigate("/partner-home")
    }
},[navigate])
  return (
    
    <div>
        <Head/>
        <Grid container spacing = {0}>
          <Grid md={6} sm ={12}>
            <PartnerLogin/>
          </Grid>
          <Grid md={6} sm ={12}>
            <PartnerLoginBanner/>
          </Grid>
        </Grid>
    </div>
  )
}

export default PartnerLoginpage