import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext'
import './AdminNav.css'

function AdminNav() {
  const navigate = useNavigate()
  const { token,setTokens} = useContext(UserContext)
  const logout = ()=>{
    localStorage.clear()
    setTokens(null)
    navigate('/admin')

  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#2B7754">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
          <div className="logo">
                <img src="/Logo/logo-trans.png" alt="logo" />
            </div>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/approve-turf" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Approve Turf</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/users" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin-bookings" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Bookings</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink> */}
              <CDBSidebarMenuItem icon="exclamation-circle" onClick={logout}>Logout</CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  )
}

export default AdminNav