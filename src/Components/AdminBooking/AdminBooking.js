import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

import Button from '@mui/material/Button';
import axios,{unAuthInstance} from '../../axios'


function AdminBooking() {
    const [count,setCount] = useState(0)
    const [rows, setRows] = React.useState([]);
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        unAuthInstance.get('booking/view-bookings/',).then((res)=>{
            console.log(res.data);
            setRows(res.data)
            setLoading(false)
        })
    },[count])

    
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'court', headerName: "Court", width: 130 },
        { field: 'date', headerName: 'Date', width: 150 },
        {
          field: 'start_time',
          headerName: 'Start time',
          width: 150,
        },
        {
          field: 'end_time',
          headerName: 'End time',
          width: 150,
        },
        {
          field: 'is',
          headerName: 'Turf ID',
          width: 70,
          renderCell: (params) => {
            const row = params.row
            return(row.turf.id)
          }
        }
        
        
        
      ];
  return (
    <div style={{ height: 400, width: '100vw', margin:' auto 5rem' }}>
        <ToastContainer/>
        <h1>Booking Details</h1>
      {loading?<CircularProgress/>:<DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />}
    </div>
  )
}

export default AdminBooking