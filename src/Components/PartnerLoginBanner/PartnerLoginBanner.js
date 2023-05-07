import React from 'react'
import "./PartnerLoginbanner.css"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import {Link} from 'react-router-dom'

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#2B7754",
    '&:hover': {
      backgroundColor: "#05B961",
    },
  }));
function PartnerLoginBanner() {
  return (
    <div className="login-banner">
        <div className="login-banner-card">
            <img className='login-banner-img' src={"/images/football-field-vector.png"} alt="football-vector" />
            <div className="login-banner-content">
                <h6>It is the chance to list your sport feilds in <b>Exalt</b></h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
            </div>
            <div className="partner-register-button">
            
               <Link to='/partner-reg' style={{textDecoration: 'none',color:'white'}}><ColorButton variant="contained" color="success">Register</ColorButton></Link> 
            
            
            </div>        
        </div>
    </div>
  )
}

export default PartnerLoginBanner