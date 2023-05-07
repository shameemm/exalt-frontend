import React, { useContext } from 'react'
import './Banner.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { UserContext } from '../../Context/UserContext';



const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: 'rgba(73, 215, 179, 0.7)',
  borderRadius: '10px',
  border: '1px solid rgba(73, 215, 179, 0.7)',
  '&:hover': {
    backgroundColor: 'rgba(73, 215, 179, 0)',
    border: '1px solid rgba(73, 215, 179, 0.7)'
  },
}));

function Banner() {
  const token = JSON.parse(localStorage.getItem('token'))
  if(token!=null){
    console.log(token);
    const decoded = jwt_decode(token.access)
    console.log(decoded.is_partner);
  }
  return (
    <div>
      <div className="banner">
        <div className="banner-image">
          <div className="qoute">
            <p className="qoute-content">“The only way to prove that you’re a good sport is to lose.”</p>
            <p className="qoute-persone-name">— Ernie Banks</p>
          </div>
          <div className="buttons">
            {/* <div className="button-explore">
              <ColorButton variant = "outlined"><Link className="button-banner" to='/explore'> Explore </Link></ColorButton>
            </div> */}
            <div className="button-explore">
              <ColorButton style={{marginTop:'1rem'}} variant = "outlined"><Link className="button-banner" to='/turf-list'> Book Now </Link></ColorButton>
            </div>
            {/* <div className="banner-gradient"></div> */}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Banner