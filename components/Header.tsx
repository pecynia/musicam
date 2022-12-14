import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <div className='bg-yellow-300 font-spaceGrotesk'>
      <div className='flex justify-between p-5 max-w-7xl mx-auto'>
        <div className='flex items-center space-x-5'>
          
          {/* Main logo */}
          <Link href='/'>
            <h3 className='-mt-1 object-contain cursor-pointer font-mono font-bold underline decoration-black decoration-8'>Musicam</h3>
          </Link>
          
          {/* Other links */}
          <div className='hidden sm:inline-flex items-center space-x-5'>
            <Link href='/about'>
              <h3 className='cursor-pointer'>About</h3>
            </Link>
            <Link href='/instructions'>
              <h3 className='cursor-pointer'>Instructions</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header