import React from 'react'
import AdminNav from '../../Components/AdminNav/AdminNav'
import AdminBooking from '../../Components/AdminBooking/AdminBooking';

import Grid from '@mui/material/Grid';

function AdminBookingsView() {
  return (
    <Grid container >
    <Grid md={2} style={{display:'flex'}}>
        <AdminNav/>
        <AdminBooking/>
        
    </Grid>
    </Grid>
  )
}

export default AdminBookingsView