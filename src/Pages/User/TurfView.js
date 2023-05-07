import React from 'react'
import Head from '../../Components/Head/Head'
import ViewTurf from '../../Components/ViewTurf/ViewTurf'
import UserReviewRating from '../../Components/UserReviewRating/UserReviewRating'

function TurfView() {
  return (
    <div>
    <Head/>
        <ViewTurf/>
        <UserReviewRating/>
    </div>
  )
}

export default TurfView