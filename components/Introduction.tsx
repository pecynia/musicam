import React from 'react'
import Link from 'next/link'

function Introduction() {
  return (
    <div className=' bg-yellow-100 rounded-b-3xl overflow-hidden py-2'>
        
        {/* Image */}
        <div className='grid grid-cols-1 font-spaceGrotesk'>
            <div className='row-start-1 col-start-1 '>
                <img src='https://i.postimg.cc/3wq0M5Kp/camera-man-2.png' className='object-none w-full h-60' />
            </div>
            
            {/* Get started */}
            <div className='row-start-1 col-start-1'>
                <div className='flex justify-center my-20 lg:ml-40 sm:ml-40'>
                    <Link href='/instructions'>
                        <div className='flex space-x-1 items-center transition ease-in-out delay-50 group cursor-pointer bg-yellow-300 pl-4 pr-6 py-2
                        space-y-0 rounded-full hover:bg-yellow-700 hover:scale-110 hover:rotate-2'>
                            
                            {/* Pictogram */}
                            <svg className='fill-yellow-800 group-hover:fill-yellow-100' xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100">
                                <g>
                                <path d="M78.746,33.028L61.62,17.213c-0.368-0.336-0.85-0.713-1.349-0.713H42.634c-5.407,0-9.134,2.81-9.134,6.877V28.5h-3.358   c-4.946,0-8.642,3.124-8.642,7.369V75.87c0,4.492,4.077,7.63,8.642,7.63h29.231c4.677,0,8.127-3.288,8.127-7.63V71.5h4.365   c4.41,0,7.635-3.513,7.635-8.122V35.055c0-0.029,0.242-0.057,0.241-0.085c0.001-0.03,0.134-0.059,0.134-0.089   C79.875,34.041,79.48,33.324,78.746,33.028z M61.5,23.165L72.649,32.5H61.5V23.165z M63.5,75.87c0,2.363-1.938,3.63-4.127,3.63   H30.142c-2.323,0-4.642-1.381-4.642-3.63V35.869c0-2.6,3.095-3.369,4.642-3.369H45.5v15.381c0,1.104,1.396,1.619,2.5,1.619h15.5   V75.87z M61.216,45.5H49.5v-9.878L61.216,45.5z M71.865,67.5H67.5V47.547c0-0.562,0.014-1.097-0.4-1.476l-17.43-16.059   c-0.324-0.667-0.94-1.132-1.732-1.132c-0.036,0-0.039-0.182-0.075-0.18c-0.038-0.002-0.044-0.201-0.083-0.201H37.5v-5.123   c0-2.063,3.02-2.877,5.134-2.877H57.5v14.381c0,1.104,1.396,1.619,2.5,1.619h15.5v26.878C75.5,65.776,74.068,67.5,71.865,67.5z"/>
                                </g>
                            </svg>

                            {/* Text */}
                            <h3 className='text-lg font-bold text-yellow-700 group-hover:text-yellow-100 font-spaceGrotes'>
                                Get started
                            </h3>
                        </div>
                    </Link>
                </div>
            </div>            
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 pb-10 pt-5 px-10 font-spaceGrotesk'>

            {/* Left side of the introduction */}
            <div className='bg-yellow-300 rounded-2xl -mt-10 sm:ml-10 sm:-mr-10 transform sm:-rotate-1'>
                {/* Introduction */}
                <div className='p-10 text-yellow-700'>
                    <div className='flex justify-center'>
                        <h3 className='text-3xl font-bold f'>
                            Welcome to
                            <span>{" "}</span>
                            <span className='font-mono text-3xl underline  underline-offset-4 decoration-8'>
                                Musicam
                            </span>
                        </h3>
                    </div>
                    <h2 className='px-3 py-3 text-xl'>
                        Musicam is a collaborative filmmaking tool that allows you to connect up to 5 camera's and be your own director! Keep track and guide your film crew all in real-time! 
                    </h2>
                </div>
            </div>

            {/* Right side of the introduction, something like an image */}
            <div className='hidden sm:inline-flex bg-yellow-200 rounded-2xl -mb-5 sm:ml-10 z-10'>
                <div className='p-10 text-yellow-700'>
                    <div>
                        <h2 className='text-xl pt-5'>
                            Empowering small crews and independent bands. Whether you have a big stage or a small show, Musicam is the tool for you.
                        </h2>
                    </div>                    
                </div>              
            </div>            
        </div>
    </div>
  )
}

export default Introduction