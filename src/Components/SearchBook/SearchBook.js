import React from 'react'
import Grid from '@mui/material/Grid';

import './SearchBook.css'

function SearchBook() {
  return (
    <div>
      
      <div className="search-book">
      <Grid container space={1}>
        <div className="search">
          <Grid md={3} xs={1}>
          <div className="card-title">
            <p>Search</p>
          </div>
          <div className="card-logo">
            <img src="/icons/search-location.png" alt="" />
          </div>
          <div className="card-content">
            <p>Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities whole over the India</p>
          </div>
          </Grid>
        </div>
        <div className="book">
        <Grid md={3} xs={1}>
        <div className="card-title">
            <p>Book</p>
          </div>
          <div className="card-logo">
            <img src="/icons/calendar.png" alt="" />
          </div>
          <div className="card-content">
            <p>Once you’ve found the perfect ground, court or gym, Connect with the venue through the Book Now Button to make online booking & secure easier payment</p>
          </div>
          </Grid>
        </div>
        <div className="play">
        <Grid md={3} xs={1}>
          <div className="card-title">
            <p>Play</p>
          </div>
          <div className="card-logo">
            <img src="/icons/football.png" alt="" />
          </div>
          <div className="card-content">
            <p>
            You’re the hero, you’ve found a stunning turf or court, booked with ease and now its time to play. The scene is set for your epic match.                       
            </p>
          </div>
          </Grid>
        </div>
        </Grid>
      </div>
      
    </div>
  )
}

export default SearchBook