import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {toast,ToastContainer} from 'react-toastify'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal';
import './Earnings.css';
import axios from '../../axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Earnings() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = React.useState([]);
  const [acnum,setAcnum] = useState('');
  const [ifsc,setIfsc] = useState('');
  const [name,setName] = useState('');
  const [withdrawId,setWithdrawId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  let { id } = useParams();

  console.log(acnum);
  let sum = 0;
  useEffect(() => {
    axios.get(`turf/earnings/${id}/`).then((res) => {
      console.log(res.data);
      setRows(res.data);
      setLoading(false);
      
    });
  }, [total]);

  const withdraw = ()=>{
    if(acnum.length!==0 || ifsc.length !== 0 || name.length !== 0){
    console.log(withdrawId);
    axios.patch(`turf/withdrawn-earnings/${withdrawId}/`).then((res)=>{
      if(res.status === 200){
        setTotal(total+1);
        toast('Withdrawn Successfully');
        handleClose();
        
      }
    })
  }
  else{
    toast("Fill the details")
  }

  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'day', headerName: 'Date', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 200 },
    {
      field: 'is',
      headerName: 'Withdraw',
      width: 150,
      renderCell: (params) => {
        const row = params.row;
        if (row.status !== 'Withdrawn') {
          return (
            <Button onClick={() => { handleOpen(); setWithdrawId(row.id) }} variant="contained">Withdraw</Button>
          );
        } else {
          return row.status;
        }
      }
    }
  ];
  return (
    <div className="earnings_list">
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">Enter Bank Details</Typography>
          <TextField id="outlined-basic" onChange={(e)=>setAcnum(e.target.value)} label="A/c Number" fullullWidth sx={{ m: 1 }} variant="outlined" />
          <TextField id="outlined-basic" onChange={(e)=>setIfsc(e.target.value)} label="IFSC Code" fullullWidth sx={{ m: 1 }} variant="outlined" />
          <TextField id="outlined-basic" onChange={(e)=>setName(e.target.value)} label=" Banker Name" fullullWidth sx={{ m: 1 }} variant="outlined" />
          
          <Button onClick={withdraw} variant='contained'>Withdraw</Button>
          
        </Box>
      </Modal>
      <div
        style={{
          height: 400,
          width: 700,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        
        <h1 style={{ marginTop: '4rem' }}>Earnings</h1>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}

export default Earnings;