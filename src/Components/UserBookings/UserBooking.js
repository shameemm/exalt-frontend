import React, { useEffect,useState } from 'react'
import axios, { unAuthInstance } from '../../axios'
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
  const currentTime  = new Date();
  const [wallet,setWallet] = useState([])
  
  useEffect(()=>{
    axios.get(`booking/view-booking-user/${decode.user_id}/`).then((res)=>{
      console.log(res.data);
      if(res.data === "You have no bookings"){
        setData([])
      }else{
        setData(res.data)
      }
      
    })

    axios.get(`accounts/api/show-wallet/${decode.user_id}/`).then((res)=>{
      console.log(res.data)
      setWallet(res.data)
    })



  },[count])
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
        toast.success("Booking canceled successfully, Your Refund amount will be added to wallet")
        console.log(res.data);
        setCount(count + 1)
      })
      // const walletData = {
      //   user : decode.user_id,

      // }
      // unAuthInstance.post('accounts/api/add-wallet/')
      swal("Poof! Your booking has been canceled!, Your Refund amount will be added to wallet", {
        icon: "success",
      });
    } else {
      swal("Your your booking is safe!");
    }
  });
  }
  console.log(data.length);
  return (
    <div>
      <ToastContainer/>
      <div className="wallet-card">
        <h3>Wallet Balance -{wallet.wallet_amount?wallet.wallet_amount:0}/-</h3>
      </div>
      <div className="user-booking-card">
        <h3><b>Bookings</b></h3>
        <hr />{
          data.length === 0 ? <h4>No Bookings</h4> :
          data.map((item)=>{
            let date = new Date(`${item.date}T${item.start_time}`)
            if(currentTime<date){
            return(
              <>
              <div className="booking-card">
                <div className="booking-card-left">
                  <h5>Booking ID : {item.id}</h5>
                  <h5>Booking Date : {item.date}</h5>
                  <h5>Booking Time : {item.start_time} To {item.end_time}</h5>
                  <h5>Booking Amount : {item.cash}</h5>
                  <h5>Turf Name : {item.turf.turf.name}</h5>
                </div>
                <div className="booking-card-right">
                 {item.is_canceled?<p>Canceled</p> : <Button variant="contained" color="success" onClick={()=>{cancelBooking(item.id)}}>Cancel</Button>}
                </div>
              </div>
              <hr />
              </>
            )}
            
          })}
          <div className="expired" style={{display:'flex',width:'100%'}}>
            <hr style={{width:'40%'}}/>
          <p>Expired Bookings</p>
          <hr style={{width:'40%'}} />
          </div>
          
          {data.map((item)=>{
            let date = new Date(`${item.date}T${item.start_time}`)
            if(currentTime>date){
            return(
              <>
              <div className="booking-card">
                <div className="booking-card-left">
                  <h5>Booking ID : {item.id}</h5>
                  <h5>Booking Date : {item.date}</h5>
                  <h5>Booking Time : {item.start_time} To {item.end_time}</h5>
                  <h5>Booking Amount : {item.cash}</h5>
                  <h5>Turf Name : {item.turf.turf.name}</h5>
                </div>
                <div className="booking-card-right">
                  Expired
                </div>
              </div>
              <hr />
              </>
            )}
            
          })}
          

      </div>
    </div>
  )
}

export default UserBooking