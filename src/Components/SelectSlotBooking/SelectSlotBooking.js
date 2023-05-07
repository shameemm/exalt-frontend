import React, { useContext, useEffect, useState, useCallback } from 'react'
import './SelectSlotBooking.css'
import { TurfContext } from '../../Context/TurfContext'
import { useNavigate } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast, ToastContainer } from 'react-toastify';
import { styled } from '@mui/material/styles';
import useRazorpay from 'react-razorpay'
import 'react-datepicker/dist/react-datepicker.css';
import jwt_decode from 'jwt-decode'
import axios ,{ unAuthInstance } from '../../axios';


function SelectSlotBooking() {
  const Razorpay = useRazorpay();
  const navigate = useNavigate()
  const [availible, setAvailible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [age, setAge] = React.useState('');
  const [endtimes, setEndTimes] = useState([])
  const [selectedCourt, setSelectedCourt] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const now = new Date()
  const times = []
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);

  // loop through 12 hours and push each time to the array
  for (let i = 0; i < 12; i++) {

    const time = new Date(start.getTime() + i * 60 * 60 * 1000); // add one hour for each iteration
    times.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // format the time as hh:mm AM/PM and push to the array
    if (times === '12:00 AM') {
      break;
    }
  }
  function timeFormat(time) {
    const timestart = time;
    var hrs = Number(timestart.match(/^(\d+)/)[1]);
    var mnts = Number(timestart.match(/:(\d+)/)[1]);
    var format = timestart.match(/\s(.*)$/)[1];

    if (format === 'PM' && hrs < 12) {
      hrs += 12;
    } else if (format === 'AM' && hrs === 12) {
      hrs -= 12;
    }

    var hours = hrs.toString().padStart(2, '0');
    var minutes = mnts.toString().padStart(2, '0');
    var seconds = '00';

    var timeend = `${hours}:${minutes}:${seconds}`;
    return timeend
  } // print the array of times
  useEffect(() => {
    const timeToRemove = startTime;
    const index = times.indexOf(timeToRemove)
    times.splice(index, 1)
    times.splice(0, index)
    
    setEndTimes(times)
  }, [startTime, endTime])
  const dates = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear().toString()}`
    dates.push(formattedDate)
  }
  function handleSelectDate(date) {
    setSelectedDate(date)
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#2B7754'),
    width: '100%',
    marginTop: '2rem',
    margin: '1rem 0',
    backgroundColor: '#2B7754',
    '&:hover': {
      backgroundColor: '#2B7754',
    },
  }));

  let start_time
  let end_time
  if (startTime !== '' && endTime !== '') {
    start_time = timeFormat(startTime)
    end_time = timeFormat(endTime)
  }
  const { turfData, setTurfData } = useContext(TurfContext)
  if (turfData.length === 0) {
    navigate('/')
  }
  const checkData = {
    turf: turfData.id,
    court: selectedCourt,
    date: selectedDate,
    start_time: start_time,
    end_time: end_time
  }

  const start_t = new Date(`2023-04-13T${start_time}`)
  const end_t = new Date(`2023-04-13T${end_time}`)
  const diffInMs = end_t.getTime() - start_t.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const totalAmount =turfData.price[selectedCourt] * diffInHours

  const checkAvailability = async () => {

    await unAuthInstance.post('booking/check-availible/', checkData).then((res) => {
      if(res.data===true){
        toast("Slot is Availabe")
        setAvailible(true)
      }
      else{
        toast.error("Oops, slots are not availible")
        setAvailible(false)
      }

      

    })
  }
  // const navigate = useNavigate()
  const [tokens,setTokens] = useState()
  
    useEffect(() => {
        setTokens(()=>localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null)
    }, [])
  
    const handleRazopay = () => {
      setTokens(localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null)
      const a = localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null
      if(a){
        console.log(a);
        const decode = jwt_decode(a.access)
        const bookData = {
          user: decode.user_id,
          turf: turfData.id,
          court: selectedCourt,
          date: selectedDate,
          start_time: start_time,
          end_time: end_time,
          cash:totalAmount
        }
      // booking
      console.log(totalAmount);
      const options: RazorpayOptions = {
        key: "rzp_test_z8aKggxY5VTzKH",
        amount: (totalAmount / 2) * 100,
        currency: "INR",
        name: "Exalt - Turf Booking",
        description: "Test Transaction",
        image: "/Logo/logo-trans.png",
        // order_id: ,
        handler: (res) => {
          if (res.razorpay_payment_id){
            toast("Payment succesfull")
            console.log(bookData);
            axios.post('booking/create-booking/', bookData).then((res)=>{
              console.log(res.data);
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your booking has been created.',
                confirmButtonText: 'OK',
              }).then(() => {
                navigate('/');
              });    
            })
          }
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();


    }else{
      toast.error("Something went wrong")
      navigate('/login')
    }
  }

    const dateOptions = dates.map((date) => {
      // const dateString = date.toLocaleDateString('en-GB');
      return (
        <MenuItem key={date} value={date}>
          {date}
        </MenuItem>
      );
    });
    return (
      <div className='SelectSlotBooking'>
        <ToastContainer />
        <div className="turf-data-booking">
          <div className="turf-data-booking-image">
            <img src={`http://localhost:8000/${turfData.logo}`} alt="" />
          </div>
          <div className="turf-data-booking-details">
            <div className="turf-data-booking-name">
              <h4>{turfData.turf.name}</h4>
            </div>
            <div className="turf-data-booking-place">
              <p>{turfData.place}</p>
            </div>
          </div>

        </div>
        <div className="booking-price-detials">
          <h4>Pricings</h4>
          <ul className="court-list">
            {turfData.fives ? <li>  5's Football  - ₹{turfData.price.fives}/-</li> : ""}
            {turfData.sevens ? <li> 7's Football  - ₹{turfData.price.sevens}/-</li> : ""}
            {turfData.elevens ? <li>11's Football - ₹{turfData.price.elevens}/-</li> : ""}
            {turfData.cricket ? <li>Cricket       - ₹{turfData.price.cricket}/-</li> : ""}
          </ul>
        </div>
        <div className="select-and-pay">
          <div className="pick-and-pay">
            <div className="select-court">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Select Court</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(event) => setSelectedCourt(event.target.value)}
                >
                  {turfData.fives && <FormControlLabel value="fives" control={<Radio />} label="5's Football" />}
                  {turfData.sevens && <FormControlLabel value="sevens" control={<Radio />} label="7's Football" />}
                  {turfData.elevens && <FormControlLabel value="elevens" control={<Radio />} label="11's FOotball" />}
                  {turfData.cricket && <FormControlLabel value="cricket" control={<Radio />} label="Cricket" />}

                </RadioGroup>
              </FormControl>
            </div>
            <div className="pick-date-and-time">
              <FormLabel id="demo-row-radio-buttons-group-label">Select Date</FormLabel><br />
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Pick a date</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={selectedDate}
                  label="Select Date"
                  onChange={(e) => handleSelectDate(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Select Date</em>
                  </MenuItem>
                  {dateOptions}
                </Select>
              </FormControl>
              <div className="time-picker">
                <FormLabel id="demo-row-radio-buttons-group-label">Select start and end time</FormLabel><br />
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">Start Time</InputLabel>
                  <Select labelId="demo-select-small" id="demo-select-small" value={startTime} label="Start Time" onChange={(e) => setStartTime(e.target.value)}>
                    <MenuItem value="">
                      <em>Start Time</em>
                    </MenuItem>
                    {times.map((time) => {
                      return (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">End Time</InputLabel>
                  <Select labelId="demo-select-small" id="demo-select-small" value={endTime} label="Start Time" onChange={(e) => setEndTime(e.target.value)}>
                    <MenuItem value="">
                      <em>end Time</em>
                    </MenuItem>
                    {endtimes.map((time) => {
                      return (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <div className="check-button">
                  <ColorButton onClick={checkAvailability} >Check availability</ColorButton>
                </div>
                {availible && <p>The Slot is availible</p>}
              </div>
            </div>
          </div>
          <div className="paymentpart">
            <div className="selected-court-price">
              <p>Total Amount = {isNaN(totalAmount) ? 0:totalAmount}/-</p>
              <p>Payable Amount = {isNaN(totalAmount) ? 0:totalAmount}/-</p>
              {/* <p>You have to pay 50% of total amount for confirm your booking</p> */}
              {availible?<ColorButton onClick={handleRazopay} >Pay with RazorPay</ColorButton>:<ColorButton onClick={checkAvailability} >Check Availibility</ColorButton>}
              {/* {availible&&<ColorButton>Pay with PayPal</ColorButton>} */}
            </div>
          </div>
        </div>
      </div>
    )
  
} 
export default SelectSlotBooking