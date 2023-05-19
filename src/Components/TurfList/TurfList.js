import React, { useContext, useEffect, useState } from 'react'
import './TurfList.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import axios,{unAuthInstance} from '../../axios'
import {Link} from 'react-router-dom'
import { TurfContext } from '../../Context/TurfContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function TurfList() {
  const buttonStyle = {color : 'white'}
  const {turf,} = useContext(TurfContext)
  const viewTurf = (id)=>{}
  const [data, setData] = useState([])
  useEffect(()=>{
    unAuthInstance.get('turf/get-details/').then((res)=>{
      console.log(res.data);
      setData(res.data)
    })
  },[])
  return (
    <div className='user-turf-list'>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {data.map((item)=>{
          if(item.approved&&item.unlisted===false){
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Item>
                <div className="turf-list-card">
                  <img src={`https://cartify.website/${item.logo}`} alt="" />
                  <h3>{item.turf.name}</h3>
                  <p>{item.place}</p>
                  <Rating name="read-only" value='5' readOnly />
                  <button > <Link style={buttonStyle} to={`/view-turf/${item.id}`}> Book</Link> </button>
                </div>
              </Item>
            </Grid>
            )
          }
          else{
            return(
              <center><p>No Turfs are Available</p></center>
            )
          }
        })}
      </Grid>
    </Box>
    </div>
  )
}

export default TurfList