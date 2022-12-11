import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Introduction from '../components/Introduction'
import UserChoice from '../components/UserChoice'

const Home: NextPage = () => {
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
      <div className='bg-yellow-50'>
        <Introduction />
        
        {/* Userchoice */}
        <div className='py-10'>
          <UserChoice />
        </div>
      </div>
    </div>
  )
}

export default Home
