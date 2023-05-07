import React from 'react'
import Head from '../../Components/Head/Head'
import TurfList from '../../Components/TurfList/TurfList'
import TurfListBanner from '../../Components/TurfListBanner/TurfListBanner'

function ListView() {
  return (
    <div>
        <Head></Head>
        <TurfListBanner/>
        <TurfList/>
    </div>
  )
}

export default ListView