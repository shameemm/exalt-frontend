import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import axios from '../../axios'


function UserTable() {
    const [count,setCount] = useState(0)
    const [rows, setRows] = React.useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        axios.get('admins/user-details/',).then((res)=>{
            console.log(res.data);
            setRows(res.data)
            setLoading(false)
        })
    },[count])
    const handleBlockClick = (id) =>{
        
        console.log(id);
        swal({
            title: "Are you sure?",
            // text: "Once cancel, you will not be able to recover this booking!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {setLoading(true)
                axios.patch(`admins/user-block/${id}/`,).then((res)=>{
                    toast("User is blocked")
                    setCount(count+1)
                    setLoading(false)
                    
                    
                    console.log(res.data);
                })
              swal("Poof! Your user has been blocked!", {
                icon: "success",
              });
            } else {
              swal("Your user is safe!");
            }
          });
        
    }
    const handleUnBlockClick = (id) =>{
        setLoading(true)
        console.log(id);
        axios.patch(`admins/user-unblock/${id}/`,).then((res)=>{
            toast("User is Unblocked")
            setCount(count-1)
            setLoading(false)
            console.log(res.data);
        })
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: "User's name", width: 130 },
        { field: 'email', headerName: 'Email', width: 300 },
        {
          field: 'phone',
          headerName: 'Phone number',
          type: 'number',
          width: 300,
        },{
            field: 'is',
            headerName: 'Block',
            width: 120,
            renderCell: (params) => {
                const row = params.row
                if(row.is_active){
                    return(
                        <Button onClick={()=>handleBlockClick(row.id)}>Block</Button>
                    )
                } else {
                    return <Button onClick={()=>handleUnBlockClick(row.id)}>Unblock</Button>
                }
            }
          },
        
      ];
  return (
    <div style={{ height: 400, width: '100vw', margin:' auto 5rem' }}>
        <ToastContainer/>
        <h1>User Details</h1>
      <DataGrid
        rows={rows}
        loading={loading}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}

export default UserTable