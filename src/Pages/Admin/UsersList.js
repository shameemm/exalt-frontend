import React from 'react';
import Grid from '@mui/material/Grid';
import AdminNav from '../../Components/AdminNav/AdminNav'
import UserTable from '../../Components/UserTable/UserTable';

function UsersList() {
  return (
    <div><Grid container >
    <Grid md={2} style={{display:'flex'}}>
        <AdminNav/>
        <UserTable/>
    </Grid>
    </Grid>
</div>
  )
}

export default UsersList