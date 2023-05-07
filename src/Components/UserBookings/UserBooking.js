import React, { useEffect,useState } from 'react'
import axios from '../../axios'
import jwt_decode from 'jwt-decode'
import {toast, ToastContainer } from 'react-toastify'
import './UserBooking.css'
import swal from 'sweetalert'
import { Button } from '@mui/material'
function UserBooking() {
  const [data,setData]=useState([])
  const token = JSON.parse(localStorage.getItem('token'))
  const [count,setCount] = useState(0)
  const decode = jwt_decode(token.access)

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
  useEffect(()=>{
    axios.get(`booking/view-booking-user/${decode.user_id}/`).then((res)=>{
      console.log(res.data);
      if(res.data === "You have no bookings"){
        setData([])
      }else{
        setData(res.data)
      }
      
    })

  },[count])
  console.log(data.length);
  return (
    <div>
      <ToastContainer/>
      <div className="user-booking-card">
        <h3><b>Bookings</b></h3>
        <hr />{
          data.length === 0 ? <h4>No Bookings</h4> :
          data.map((item)=>{
            return(
              <>
              <div className="booking-card">
                <div className="booking-card-left">
                  <h5>Booking ID : {item.id}</h5>
                  <h5>Booking Date : {item.date}</h5>
                  <h5>Booking Time : {item.start_time}</h5>
                  <h5>Booking Amount : {item.cash}</h5>
                  <h5>Turf Name : {item.turf.turf.name}</h5>
                </div>
                <div className="booking-card-right">
                 {item.is_canceled?<p>Canceled</p> : <Button variant="contained" color="success" onClick={()=>{cancelBooking(item.id)}}>Cancel</Button>}
                </div>
              </div>
              <hr />
              </>
            )
          })}
          

      </div>
    </div>
  )
}

export default UserBooking