import React from 'react'
import Head from 'next/head'

import Header from '../../components/Header'
import { SerialReader } from '../../components/connectUSB'

function admin() {
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
        <div className='pt-7 pb-10 px-10'>

          <div className='max-w-3xl mx-auto bg-yellow-300 rounded-2xl'>
            {/* Admin text */}
            <div className='py-2 pb-3'>
              <h1 className='text-2xl font-bold text-left pl-11 text-yellow-800'>Admin</h1>
            </div>
          </div>
          
          {/* Content of container */}
          <div className='max-w-3xl mx-auto bg-yellow-100 rounded-3xl mt-4'>
            <div className='bg-yellow-200 rounded-t-3xl'>
              <h1 className='font-bold text-center text-xl text-yellow-800 pt-4 '>Setup Arduino connection</h1>
            </div>
            <div className='flex justify-center px-10 pt-3 -mb-5 bg-yellow-200 rounded-b-3xl pb-10'>
              <h1>
                Connect your Musicam Mesh receiver to a USB slot and select the corresponding COM-port through the button below. If you are not sure
                which port to select, take a look at the links below for more information.
              </h1>
            </div>

            {/* Links and button */}
            <div className='flex justify-center py-6 pb-3'>
              <SerialReader /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default admin