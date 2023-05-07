import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import axios, { unAuthInstance } from '../../axios'
import jwt_decode from 'jwt-decode'


function TurfBookingPartner() {
  const [count, setCount] = useState(0)
  const [refresh, setRefresh] = useState(true)
  const [rows, setRows] = React.useState([]);
  const token = JSON.parse(localStorage.getItem('token'))
  const decode = jwt_decode(token.access)
  useEffect(() => {
    axios.get(`booking/view-booking-turf/${decode.user_id}`,).then((res) => {
      console.log(res.data);
      setRows(res.data)
      setRefresh(false)
    })
  }, [count])

  const cancelBooking = (id) => { swal({
    title: "Are you sure?",
    text: "Once cancel, you will not be able to recover this booking!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      axios.patch(`booking/cancel-booking/${id}/`).then((res) => {
        toast.success("Booking canceled successfully")
        setCount(count + 1)
      })
      swal("Poof! Your booking has been canceled!", {
        icon: "success",
      });
    } else {
      swal("Your your booking is safe!");
    }
  });
  }

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
        field: 'id',
        headerName: 'User ID',
        width: 70,
        renderCell: (params) => {
          const row = params.row
          return (row.user.id)
        }
      }, {
        field: 'cancel',
        headerName: 'Cancel',
        width: 120,
        renderCell: (params) => {
          const row = params.row
          if (row.is_canceled) {
            return (
              <p>Canceled</p>
            )
          } else {
            return <Button onClick={()=>cancelBooking(row.id)} >Cancel</Button>
          }
        }
      }
    ];
    return (
      <div style={{ height: 400, width: '100vw', margin: ' auto 5rem' }}>
        <ToastContainer />
        <h1>Booking Details</h1>
        {refresh ? <CircularProgress /> : <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />}
      </div>
    )
  }

  export default TurfBookingPartner