import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import {Wrapper} from "../../components/graphicals/WrapperStageComp"
import { ChatAdmin } from '../../components/chat/ChatAdmin'

function controlpanel() {
  return (
    <div className="max-w-5xl mx-auto">
      <Head>
        <title>musicam.io</title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/92/92201.png" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700&display=swap"/>
      </Head>

      {/* Generic header */}
      <Header />

      {/* Main components */}
      <div className='bg-yellow-50 font-spaceGrotesk'>
        
        {/* Background image */}
        <div className='pt-2'>
            <img src='https://i.postimg.cc/3wq0M5Kp/camera-man-2.png' className='object-none w-full h-20' />
        </div>

        {/* main container */}
        <div className=''>
          {/* The stage on the right */}
          <div id='container' className='max-w-5xl mx-auto h-screen mt-2 bg-yellow-200 overflow-hidden ml-60'>
            <Wrapper selectedId={0}/>
          </div>

          {/* The chatbox on the left */}
          <div className='absolute top-40 left-70 w-60 h-screen'>
            <ChatAdmin />
          </div>          
        </div>                              
      </div>
    </div>
  )
}

export default controlpanel