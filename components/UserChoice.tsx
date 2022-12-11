import React from 'react'
import Link from 'next/link'

function UserChoice() {
  return (
    <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 font-spaceGrotesk px-20 sm:px-30'>

            {/* Left cell */}
            <div className='hidden sm:inline-flex col-start-1 row-start-1 bg-yellow-100 justify-center items-center rounded-xl sm:rounded-r-none'>
                <div className='overflow-hidden'>
                    <img src='https://i.postimg.cc/02RRHMx0/DALL-E-2022-10-18-23-42-00-oil-painting-of-concert-hall-with-a-camera-man-and-camera.png' 
                className='-mb-2' />
                </div>
                
            </div>


            {/* Right cell */}
            <div className='grid sm:col-start-2 row-start-1 -mx-10 sm:mx-0 py-5 md:py-10 justify-center bg-yellow-100 rounded-3xl sm:rounded-l-none'>
                
                {/* Text above buttons */}
                <div className='flex justify-center px-10 -mb-5 ml-4'>
                    <div className='py-6 text-yellow-700'>
                        <h1 className='font-bold text-3xl'>Choose your role</h1>
                        <p className='pt-2'>Determine which role you will fullfil in the crew, or just look around</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className='pt-4'>

                    {/* Admin page */}
                    <div className='flex justify-center p-4 max-w-7xl mx-auto'>
                        <div className='transition ease-in-out delay-50 group cursor-pointer p-2 bg-yellow-300 px-10 py-1 
                        space-y-5 rounded-full  hover:bg-yellow-700 hover:scale-110 hover:rotate-2'>
                            <Link href="/admin/connect">
                                <h3 className='text-lg font-bold text-yellow-700 group-hover:text-yellow-50 '>Admin</h3>
                            </Link>
                        </div>
                    </div>
                
                    {/* Camera page */}
                    <div className='flex justify-center p-3 max-w-7xl mx-auto'>
                        <div className='transition ease-in-out delay-50 group cursor-pointer p-2 bg-yellow-300 px-9 py-1 
                        space-y-5 rounded-full hover:bg-yellow-700 hover:scale-110 hover:-rotate-2'>
                            <Link href="/camera">
                                <h3 className='text-lg font-bold text-yellow-700 group-hover:text-yellow-50'>Camera</h3>
                            </Link>
                        </div>
                    </div>
                    
                    {/* Spectator */}
                    <div className='flex justify-center p-4 max-w-7xl mx-auto hover:'>
                        <div className='transition ease-in-out delay-50 group cursor-pointer p-2 bg-yellow-300 px-6 py-1 
                        space-y-5 rounded-full hover:bg-yellow-700 hover:scale-110 hover:rotate-2'>
                            <Link href="/spectator">
                                <h3 className='text-lg font-bold text-yellow-700 group-hover:text-yellow-50'>Spectator</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserChoice