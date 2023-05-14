import React, { useEffect, useState } from 'react'
import './ApproveTurf.css'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import axios, { unAuthInstance } from '../../axios';
import { ToastContainer, toast } from 'react-toastify';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ApproveTurf() {
    const [loading,setLoading] = useState(false)
    const [approve,setApprove] = useState(0)
    const [data,setData] = useState([])
    function acceptTurf(id,e){
        console.log(id);
        setApprove(approve-1)
        const data = {
          'approve' : true
        }
        axios.patch(`turf/approve-turf/${id}/`,data).then((res)=>{
          toast("updated")
        }).catch((err)=>{
          toast.error(err)
        })
    }
    const unlistTurf = (id) =>{
      unAuthInstance.patch(`turf/unlist-turf/${id}/`).then((res)=>{
        console.log(res.data);
      })
    }
    function rejectTurf(id,e){
      console.log(id);
      setApprove(approve+1)
      const data = {
        'approve' : false
      }
      axios.patch(`turf/reject-turf/${id}/`,data).then((res)=>{
        toast("updated")
      }).catch((err)=>{
        toast.error(err)
      })
  }
    useEffect(()=>{
        axios.get('turf/get-details/').then((res)=>{
            console.log(res.data);
            setData(res.data)
        })
    },[approve])
  return (
    <div className = "approve-turf">
        <h1 >Approve Turf</h1>
        <div className="approve-turf-body">
        <Grid container spacing={8}>
        {data.map((data)=>{
          if(data.unlisted===false){
          
            return(
              
              <Grid item xs={12} sm={6} md={4} lg={3}>
                {/* <Item> */}
                <div className="approve-card">
                  <div className="approve-card-image">
                    <img src={`https://cartify.website/${data.logo}/`} alt="" />
                  </div>
                  <div className="approve-card-title">
                    <h2>{data.turf.name}</h2>
                  </div>
                  <div className="approve-card-body">
                    <p>{data.place}</p>
                  </div>
                  { data.approved? <p><b>Approved</b></p>:
                    <div className="approve-card-buttons">
                    <Button variant="contained" color="success" onClick={(e)=>acceptTurf(data.id,e)}>Accept</Button>
                    <Button variant="contained" color="error" onClick={(e)=>rejectTurf(data.id,e)}>Reject</Button>
                  </div>}
                  {data.unlisted?<p>Unlisted</p>:<Button onClick={()=>{unlistTurf(data.id)}}> Unlist </Button>}
                  </div>
                
                {/* </Item> */}
              </Grid>
              
            )
          }
        })}
        </Grid>
          
          </div>
    </div>
  )
}

export default ApproveTurf