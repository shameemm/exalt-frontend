import React, { useEffect, useState } from 'react'
import Head from '../../Components/Head/Head'
import Banner from '../../Components/Banner/Banner'
import TopRated from '../../Components/TopRated/TopRated'
import SearchBook from '../../Components/SearchBook/SearchBook'
import axios from 'axios'

function Home() {
    
    
    
  return (
    <div>
        <Head></Head>
        <Banner/>
        <TopRated/>
        {/* <SearchBook/> */}
        
        
       
    </div>
  )
}

export default Home