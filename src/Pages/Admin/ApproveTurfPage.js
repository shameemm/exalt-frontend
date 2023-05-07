import React from 'react'
import Grid from '@mui/material/Grid';
import AdminNav from '../../Components/AdminNav/AdminNav'
import ApproveTurf from '../../Components/ApproveTurf/ApproveTurf'

function ApproveTurfPage() {
  return (
    <div><Grid container >
    <Grid md={2} style={{display:'flex'}}>
        <AdminNav/>
        <ApproveTurf/>
    </Grid>
    </Grid>
    </div>
  )
}

export default ApproveTurfPage