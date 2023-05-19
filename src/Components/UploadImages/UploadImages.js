import React, { useContext } from 'react'
import './UploadImages.css'
import { Button } from '@mui/material'
import { useState } from 'react'
import { TurfContext } from '../../Context/TurfContext'
import { unAuthInstance } from '../../axios'

function UploadImages({handleImageClose}) {
    const [image,setImage] = useState(null)
    const [image1,setImage1] = useState(null)
    const [image2,setImage2] = useState(null)
    const [image3,setImage3] = useState(null)
    const {turfData, setTurfData} =useContext(TurfContext)
    
    const uploadImages = (e)=>{
        e.preventDefault()
        const ImageData={
            turf: turfData.id,
            image:image,
            image1:image1,
            image2:image2,
            image3:image3
        }
        
        console.log(ImageData);
        unAuthInstance.post('turf/add-image/',ImageData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((res)=>{
            console.log(res.data);
            handleImageClose()
        })
    }
  return (
    <div calss="add-image-modal">
        <div className="add-image-title">
            <h3>Add Images</h3>
            <p>Upload 4 images required</p>
        </div>
        <form action="" onSubmit={uploadImages}>
            <div className="add-image-form">
                <input type="file" required accept="image/png, image/gif, image/jpeg" onChange={(event)=>setImage(event.target.files[0])} name="" id="" />
                <input type="file" required accept="image/png, image/gif, image/jpeg" onChange={(event)=>setImage1(event.target.files[0])} name="" id="" />
                <input type="file" required accept="image/png, image/gif, image/jpeg" onChange={(event)=>setImage2(event.target.files[0])} name="" id="" />
                <input type="file" required accept="image/png, image/gif, image/jpeg" onChange={(event)=>setImage3(event.target.files[0])} name="" id="" />
            </div>
            <div className="image-submit-button">
                <Button type="submit" variant="contained" color="success"> Upload </Button>
            </div>
        </form>
    </div>
  )
}

export default UploadImages