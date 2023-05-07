import React, { useContext, useEffect, useState } from 'react'
import './UserReviewRating.css'
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import jwt_decode from 'jwt-decode'
import axios, { unAuthInstance } from '../../axios';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import { TurfContext } from '../../Context/TurfContext';

import { useNavigate, useParams } from 'react-router-dom'
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#2B7754'),
    width: '9rem',
    marginTop: '2rem',
    margin: '1rem 0',
    backgroundColor: '#2B7754',
    '&:hover': {
        backgroundColor: '#2B7754',
    },
}));

function UserReviewRating() {
    const [value, setValue] = React.useState(0);
    const [review, setReview] = useState(null)
    const [data, setData] = useState([])
    const [count,setCount] = useState(0)
    const [token, setToken] = useState(null)
    const { turfData, setTurfData } = useContext(TurfContext)
    const {id} = useParams()
    useEffect(() => {
        unAuthInstance.get(`turf/show-review/${id}/`).then((res) => {
            console.log(res.data);
            setData(res.data)
        })
    }, [turfData,count])
    
    useEffect(()=>{
        setToken(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null)
    },[token,count])
    
    const submitReview = () => {
        setCount(count+1)
        
        console.log(token);
        
        if (token !== null) {
            console.log(token);
            if (value !== 0) {
                const decode = jwt_decode(token.access)
                const reviewData = {
                    user: decode.user_id,
                    turf: turfData.id,
                    rating: value,
                    review: review,
                }
                console.log(reviewData);
                axios.post('turf/add-review/', reviewData).then((res) => {
                    setCount(count+1)
                    console.log(res.data);
                    toast("Rated succesfully")
                }).catch((err) => {
                    toast.error(err.message)
                    console.log(err);
                })

            }
            else {
                toast.error("Please rate the turf")
            }
        } else {
            toast.error("You have to login for add review")
        }
    }
    return (
        <div>
            <div className='review-rating-card'>
                <ToastContainer />
                <div className="review-rating-head">
                    <h3>Review and Rating</h3>
                </div>
                <br />
                <div className="rating-star">
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </div>
                <div className="review-input">
                    <TextField sx={{
                        width: '100%', // set a fixed width
                        maxWidth: '100%', // prevent overflow

                    }} value={review} onChange={(e) => { setReview(e.target.value) }} id="outlined-basic" label="Review" variant="outlined" />
                </div>
                <div className="review-submit">
                    <ColorButton onClick={submitReview}>Submit</ColorButton>
                </div>

            </div>
            <div className="list-reviews">
                {data&&data.map((item) => {
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

export default UserReviewRating