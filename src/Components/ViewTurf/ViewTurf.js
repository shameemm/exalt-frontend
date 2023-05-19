import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { unAuthInstance } from '../../axios'
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TurfContext } from '../../Context/TurfContext';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
const ColorButton = styled(Button)(({ theme }) => ({
  width: '100%',
  color: theme.palette.getContrastText('#2B7754'),
  backgroundColor: '#2B7754',
  '&:hover': {
    backgroundColor: '#2B7754',
  },
}));

function ViewTurf() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const { turfData, setTurfData } = useContext(TurfContext)
  const [turfName, setTurfName] = useState()
  const { id } = useParams()
  const [imageData, setImageData] = useState([])
  console.log(id);
  useEffect(() => {
    unAuthInstance.get(`turf/view-turf/${id}`).then((res) => {
      setTurfData(res.data)
      console.log(res.data);
      setTurfName(res.data.turf.name)
      setData(res.data)
    })
  }, [])
  console.log("data", data);
  useEffect(()=>{
    unAuthInstance.get(`turf/show-images/${data.id}/`).then((res)=>{
        console.log(res.data);
        setImageData(res.data)
    })

},[data])

let itemData = []
    if(imageData[0]){itemData = [
        {
            img: `https://cartify.website/${imageData[0].image}`,
        },
        {
            img: `https://cartify.website/${imageData[0].image1}`,
            title: 'Burger',
        },
        {
            img: `https://cartify.website/${imageData[0].image2}`,
            title: 'Camera',
        },
        {
            img: `https://cartify.website/${imageData[0].image3}`,
            title: 'Coffee',
        },

    ]}
  return (
    <div className="turf-detail">
      <div className="turf-detail-card">
        <div className="detail-card-left">
        {(imageData.length!==0)?<ImageList sx={{ width: 500, height: 500 }} cols={2} >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img}>
                                <img src={item.img} alt="" width="200" height="200" />
                            </ImageListItem>
                        ))}
                    </ImageList>:<CircularProgress/>}
        </div>
        <div className="detail-card-right">

        <div className="turf-address">
                        <div className="turf-logo">
                            {data.logo ? <img src={`https://cartify.website/${data.logo}`} alt="" /> : <Box sx={{ display: 'flex' }}>
                                <CircularProgress  />
                            </Box>}
                        </div>
                        <div className="title_and_place">
                            <div className="turf-name">
                                <h2>{turfName}</h2>
                            </div>
                            <div className="turf-place">
                                <h4>{data.place}</h4>
                            </div>
                        </div>

                    </div>
          <div className="turf-courts">
            <div className="court-details-heading">
              <h3>Courts Availible</h3>
              <ul className="court-list">
                {data.fives ? <li>5's Football    - ₹{data.price.fives}/-</li> : ""}
                {data.sevens ? <li>7's Football   - ₹{data.price.sevens}/-</li> : ""}
                {data.elevens ? <li>11's Football - ₹{data.price.elevens}/-</li> : ""}
                {data.cricket ? <li>Cricket       - ₹{data.price.cricket}/-</li> : ""}
              </ul>
            </div>
          </div>
          <ColorButton onClick={() => { navigate('/booking-user') }}> Book Now</ColorButton>
        </div>


      </div>
      <div className="turf-facility-card">
        <h3>Facilities</h3>
        <div className="facility-icons">
          {data.cafe ? <img src="/icons/facilities/cafe.png" alt="" /> : ""}
          {data.first_aid ? <img src="/icons/facilities/first-aid.png" alt="" /> : ""}
          {data.locker ? <img src="/icons/facilities/locker.png" alt="" /> : ""}
          {data.parking ? <img src="/icons/facilities/parking.png" alt="" /> : ""}
          {data.shower ? <img src="/icons/facilities/shower.png" alt="" /> : ""}
        </div>
      </div>
    </div>
  )
}

export default ViewTurf