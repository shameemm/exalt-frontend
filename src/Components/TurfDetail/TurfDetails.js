import React, { useEffect, useState } from 'react'
import './TurfDetail.css'
import jwt_decode from 'jwt-decode'
import Rating from '@mui/material/Rating';
import axios, { unAuthInstance } from '../../axios'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { TurfContext } from '../../Context/TurfContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ColorButton = styled(Button)(({ theme }) => ({
    width: '45%',
    marginRight:'.5rem',
    color: theme.palette.getContrastText('#2B7754'),
    backgroundColor: '#2B7754',
    '&:hover': {
        backgroundColor: '#2B7754',
    },
}));

function TurfDetails({ open }) {
    const [openEditCourt, setOpenEditCourt] = React.useState(false);
    const handleOpenEditCourt = () => setOpenEditCourt(true);
    const handleCloseEditCourt = () => setOpenEditCourt(false);
    const { turfData, setTurfData } = useContext(TurfContext)
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))
    console.log("token", token);
    const [turfName, setTurfName] = useState('')
    const decode = jwt_decode(token.access)
    const [data, setData] = useState([])
    const [count,setCount] = useState(0)
    const [reviewData, setReviewData] = useState([])
    console.log(decode.user_id);
    const id = decode.user_id
    const [fives, setFives] = useState(false)
    const [sevens, setSevens] = useState(false)
    const [elevens, setElevens] = useState(false)
    const [cricket, setCricket] = useState(false)
    const [fivesPrice,setFivesPrice] = useState(0)
    const [sevensPrice,setSevensPrice] = useState(0)
    const [elevensPrice,setElevensPrice] = useState(0)
    const [cricketPrice,setCricketPrice] = useState(0)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/turf/get-details/${id}/`)
            .then((response) => {
                console.log("data", response.data);
                setTurfData(response.data)
                setData(response.data)
                setTurfName(response.data.turf.name)
            }).catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    toast.error("You are not Authorized")
                    navigate('/partner_login')
                }
            })
    }, [open,count])

    const editCourts = ()=>{
        handleOpenEditCourt()
    }
    const editFacilities = () =>{
        
    }
    console.log(data.id);
    useEffect(() => {
        unAuthInstance.get(`turf/show-review/${data.id}/`).then((res) => {
            console.log(res.data);
            setReviewData(res.data)
        })
    }, [data])
    let priceId
    const updateCourts = async()=>{
        const priceUpdateData = {
            fives:fivesPrice,
            sevens:sevensPrice,
            elevens:elevensPrice,
            cricket:cricketPrice
        }
        console.log(priceUpdateData);
        const token = JSON.parse(localStorage.getItem('token'))
        const decode = jwt_decode(token.access)
        const id = decode.user_id
        await axios.put(`turf/update-pricing/${data.price.id}/`,priceUpdateData).then((res)=>{
        console.log(res.data);
        setCount(count+1)
        priceId = res.data.id
      })

        
        const turfUpdateData = {
            price:priceId,
            fives:fives,
            sevens:sevens,
            elevens:elevens,
            cricket:cricket,
            
        }
        console.log(turfUpdateData);
        await axios.put(`turf/edit-turf/${id}/`,turfUpdateData).then((res)=>{
            console.log(res.data);
            setCount(count+1)
            handleCloseEditCourt()
        })
    }
    console.log(reviewData);
    console.log("data[0]", data);
    // const itemData = [
    //     {
    //       img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    //       title: 'Breakfast',
    //     },
    //     {
    //       img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    //       title: 'Burger',
    //     },
    //     {
    //       img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    //       title: 'Camera',
    //     },
    //     {
    //       img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    //       title: 'Coffee',
    //     },

    //   ];
    return (
        <div className="turf-detail">
            <Modal
          open={openEditCourt}
          onClose={handleCloseEditCourt}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>Edit Courts</h3>
            <FormControlLabel control={<Checkbox onChange={(event) => { setFives(event.target.checked) }} />} label="5's Football" />
          <input type="number" placeholder='Price' value={fivesPrice !=0 && fivesPrice} onChange={(e)=>{setFivesPrice(e.target.value)}} disabled={!fives}></input><br/>
          <FormControlLabel control={<Checkbox  onChange={(e) => { setSevens(e.target.checked) }} />} label="7's Football" />
          <input type="number" placeholder='Price' value={sevensPrice!=0 && sevensPrice} onChange={(e)=>{setSevensPrice(e.target.value)}} disabled={!sevens}></input><br/>
          <FormControlLabel control={<Checkbox  onChange={(e) => { setElevens(e.target.checked) }} />} label="11's Football" />
          <input type="number" placeholder='Price' value={elevensPrice!=0 && elevensPrice} onChange={(e)=>{setElevensPrice(e.target.value)}} disabled={!elevens}></input><br/>
          <FormControlLabel control={<Checkbox  onChange={(e) => { setCricket(e.target.checked) }} />} label="Cricket" />
          <input type="number" placeholder='Price' value={cricketPrice!=0 &&cricketPrice} onChange={(e)=>{setCricketPrice(e.target.value)}} disabled={!cricket}></input><br/>
          <Button onClick={updateCourts}>Update</Button>
          </Box>
        </Modal>
            <div className="turf-detail-card">
                <div className="detail-card-left">
                    {/* <ImageList sx={{ width: 400, height: 400 }} cols={2} >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList> */}
                    <div className="turf-logo">
                        {data.logo ? <img src={`http://localhost:8000/${data.logo}`} alt="" /> : <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>}
                    </div>
                </div>
                <div className="detail-card-right">

                    <div className="turf-address">

                        <div className="turf-name">
                            <h2>{turfName}</h2>
                        </div>
                        <div className="turf-place">
                            <h4>{data.place}</h4>
                        </div>
                    </div>
                    <div className="turf-courts">
                        <div className="court-details-heading">
                            <div className='courts-available'><h3>Courts Availible</h3><p onClick={editCourts} style={{marginLeft:'auto',cursor:'pointer'}}>edit</p></div>
                            <ul className="court-list">
                                {data.fives ? <li>5's Football  {data.price.fives}</li> : ""}
                                {data.sevens ? <li>7's Football {data.price.sevens}</li> : ""}
                                {data.elevens ? <li>11's Football {data.price.elevens}</li> : ""}
                                {data.cricket ? <li>Cricket {data.price.cricket}</li> : ""}
                            </ul>
                        </div>
                    </div>
                    <div className="buttons-partner-home">
                        <div className="bookings-button">
                            <Link to='/partner-bookings'><ColorButton>Bookings</ColorButton></Link>
                            <Link to={`/earnings/${data.id}`}><ColorButton>Earnings</ColorButton></Link>
                            <br />
                            {/* <ColorButton>Slot Management</ColorButton> */}
                        </div>
                    </div>
                </div>


            </div>
            <div className="turf-facility-card">
                <div className="facilities"><h3>Facilities</h3>
                {/* <p style={{marginLeft:'auto',cursor:'pointer'}} onClick={editFacilities}>edit</p> */}
                </div>
                <div className="facility-icons">
                    {data.cafe ? <img src="/icons/facilities/cafe.png" alt="" /> : ""}
                    {data.first_aid ? <img src="/icons/facilities/first-aid.png" alt="" /> : ""}
                    {data.locker ? <img src="/icons/facilities/locker.png" alt="" /> : ""}
                    {data.parking ? <img src="/icons/facilities/parking.png" alt="" /> : ""}
                    {data.shower ? <img src="/icons/facilities/shower.png" alt="" /> : ""}
                </div>
            </div>
            <div className="list-reviews-partner">
            <h3>Review and rating</h3>
                {reviewData&&reviewData.map((item) => {
                    return (
                        <React.Fragment>
                            <div className="review-list-username">
                                <h6>{item.user.name}</h6>
                            </div>
                            <div className="review-list-rating">
                                <Rating name="read-only" value={item.rating} readOnly />
                            </div>
                            <div className="review-list-review">
                                <p>{item.review}</p>
                            </div>
                            <hr></hr>
                        </React.Fragment>
                    )
                })}

            </div>
        </div>
    )
}

export default TurfDetails