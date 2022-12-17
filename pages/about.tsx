import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'

function about() {
    return (
        <div className="max-w-5xl mx-auto">
            <Head>
                <title>musicam.io</title>
                <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/92/92201.png" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700&display=swap" />
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
                <div className='pt-7 pb-10 px-10 h-screen'>
                        
                    {/* About text */}
                    <div className='max-w-3xl mx-auto bg-yellow-300 rounded-2xl'>
                        <div className='py-2 pb-3'>
                            <h1 className='text-2xl font-bold text-left pl-11 text-yellow-800'>About</h1>
                        </div>
                    </div>

                    {/* Content of container */}
                    <div className='max-w-3xl mx-auto bg-yellow-50 rounded-3xl mt-4 text-yellow-800'>
                        <div className='bg-yellow-100 rounded-3xl px-10 pt-3 -mb-5 pb-10'>
                            <h1 className='font-bold text-center text-2xl pt-4 '>About Musicam.io</h1>

                            {/* goal text */}
                            <h1 className='font-bold pt-5 text-xl'>
                                Goal
                            </h1>
                            <h1 className='pb-2 pl-2'>
                                Musicam.io is a web application that visualizes the Musicam Mesh network through a web browser. It combines the data 
                                from the sensors in the network and displays it in a user-friendly way. The application is meant to be a proof of 
                                concept for the Musicam Mesh network.
                            </h1>
                            
                            {/* Tools used */}
                            <h1 className='font-bold pt-5 text-xl'>
                                Tools used
                            </h1>
                            <h1 className='pb-5 pl-2'>
                                The application is built using the <span className='font-bold'>Next.js </span>
                                framework (React.js), <span className='font-bold'>TailwindCSS</span> and <span className='font-bold'>TypeScript</span>. It is hosted on Vercel done through github
                                integration. The application is also connected to a <span className='font-bold'>RealTime Firebase</span> database.
                            </h1>
                            <h1>
                                The application is a joint effort between the following students at the Radboud University:

                                <ul className='list-disc list-inside text-center pb-5 font-bold'>
                                    <li>Joost Overmars (s1055683)</li>
                                    <li>Nicolai Verheul (s1053380)</li>
                                </ul>

                                The application serves as the final project for the course <span className='font-bold'>New Device Lab NWI-IBC041</span> at the Faculty 
                                of Science of the Radboud University in the academic year 2022-2023.
                            </h1>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default about