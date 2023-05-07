import React, { useContext, useState } from 'react'
import './Head.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import jwt_decode from 'jwt-decode'

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Head() {
  const [decode, setDecode] = React.useState({})
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate()
  // console.log(window.location.pathname)
  const { token, setTokens } = useContext(UserContext)
  // { token ? console.log("head", token) : console.log("Null") }
  // let decode = jwt_decode(token)
  const logout = () => {
    localStorage.clear()
    setTokens(null)
    if (window.location.pathname === '/partner-home' || window.location.pathname === '/partner-bookings') {
      navigate('/partner_login')
    }
  }

  return (
    <div>
      {/* <button onClick={notify}>Notify !</button> */}
      <ToastContainer />
      <AppBar position="static" style={{ background: '#ffffff' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon style={{ color: '#000' }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  {window.location.pathname === '/admin' ? <div></div> :
                    <div className="links">
                      <p><Link className='link-head' to="/">Home</Link></p>
                  <p><Link className='link-head' to="/partner_login">Partner</Link></p>

                      { token ? (<span> <p onClick={()=>{
                        logout()
                        toast("Logged Out !")
                      }}> Logout </p> <p onClick={()=>{
                        logout()
                        toast("Logged Out !")
                      }}> Booking </p> </span> ): (<span><p><Link className='link-head' to="/login">Login</Link></p></span>)}
                      <p><Link className='link-head' to="/contact">Contact</Link></p>
                    </div>
                  }
                </MenuItem>

              </Menu>
            </Box>

            <div className="logo">
              <img src="/Logo/logo-trans.png" alt="logo" />
            </div>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {window.location.pathname === '/admin' ? <div></div> :
                <div className="links-flex">
                  <p><Link className='link-head' to="/">Home</Link></p>
                  <p><Link className='link-head' to="/partner_login">Partner</Link></p>
                  {token ? <><span><p onClick={()=>{
                        toast("Logged Out !")
                        logout()
                      }}> Logout </p></span>
                      <span><Link className='link-head' to="/user-bookings">Bookings</Link></span></> : <span><p><Link className='link-head' to="/login">Login</Link></p></span>}
                  <p><Link className='link-head' to="/contact">Contact</Link></p>
                </div>}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Head