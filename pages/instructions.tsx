import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'

function instructions() {
  return (
    <div className="max-w-5xl mx-auto bg-yellow-50">
        <Head>
            <title>musicam.io</title>
            <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/92/92201.png" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700&display=swap" />
        </Head>

        {/* Generic header */}
        <Header />

        {/* Main components */}
        <div className='font-spaceGrotesk'>

            {/* Background image */}
            <div className='pt-2'>
                <img src='https://i.postimg.cc/3wq0M5Kp/camera-man-2.png' className='object-none w-full h-20' />
            </div>

            {/* main container */}
            <div className='pt-7 px-10 pb-40'>
                    
                {/* About text */}
                <div className='max-w-3xl mx-auto bg-yellow-300 rounded-2xl'>
                    <div className='py-2 pb-3'>
                        <h1 className='text-2xl font-bold text-left pl-11 text-yellow-800'>Instructions</h1>
                    </div>
                </div>

                {/* Content of container */}
                <div className='max-w-3xl mx-auto bg-yellow-100 rounded-3xl mt-4 text-yellow-800'>
                    <div className=' rounded-3xl px-10 pt-3 -mb-5 pb-10'>
                        <h1 className='font-bold text-center text-2xl pt-4 '>set up your <span className='font-bold'>Mesh Network</span></h1>

                        <h1 className='font-bold text-left text-xl pt-5 '>Steps</h1>
                        {/* goal text */}
                        <ol className='pl-10 pt-2 text-xl list-decimal'>
                            <li className='pb-2'>Divide the roles in the team and assign corresponding hardware to each member.</li>
                            
                            <h1 className='font-bold text-left text-xl pt-5 '>Admin</h1>
                            <li className='pb-2'>Configuration of admin hardware and server connection
                                <ol className='pl-10 text-lg pt-2 list-[upper-roman]'>
                                    <li className='pb-2'>Be sure to be connected to <span className='font-bold'>WiFi</span> or any wireless internet connection</li>
                                    <li className='pb-2'>Plugin the <span className='font-bold'>ESP Server</span> in a free USB slot</li>
                                    <li className='pb-2'>Go to this <a href='https://musicam.vercel.app/admin/connect' className='font-bold text-blue-500 underline decoration-blue-500'>page</a> and connect to the server by following the instructions on the page</li>
                                    <li className='pb-2'>Once connected, you can redirected to the <span className='font-bold'>Admin Dashboard</span></li>
                                    <li className='pb-2'> You are done, you can now send messages by typing in the text box and hitting <span className='font-bold italic'>send message</span>. You can send personalized messages to individual members of the camera crew by selecting their corresponding ESP Client ID or name. If no user is selected, the message will be sent to all members of the camera crew.</li>
                                </ol>
                            </li>

                            <h1 className='font-bold text-left text-xl pt-5 '>Camera Crew</h1>
                            <li className='pb-2'>Configuration of ESP Client
                                <ol className='pl-10 text-lg pt-2 list-[upper-roman]'>
                                    <li className='pb-2'>Be sure to be connected to <span className='font-bold'>WiFi</span> or any wireless internet connection</li>
                                    <li className='pb-2'>Go to this <a href='https://musicam.vercel.app/camera' className='font-bold text-blue-500 underline decoration-blue-500'>page</a></li>
                                    <li className='pb-2'>Give yourself a name and select your corresponding <span className='font-bold'>ESP Client ID</span></li>
                                    <li className='pb-2'>Attach the ESP Client to the camera</li>
                                    <li className='pb-2'>Position the camera horizontally and connect the battery pack to the ESP Client</li>
                                    <li className='pb-2'>When the screen on the ESP Client gives you the option to calibrate, click <span className='font-bold'>button A</span></li>
                                    <li className='pb-2'>Calibrate by aiming at the corners that can be seen highlighted on the screen of the ESP Client</li>
                                    <li className='pb-2'>Once calibrated, you are ready to go!</li>
                                </ol>
                            </li>

                            <li className='pb-2'>Everything is setup! The admin can now see everyone and start sending messages.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default instructions