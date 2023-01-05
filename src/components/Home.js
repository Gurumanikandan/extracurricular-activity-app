import React from 'react'

import './Home.css'

import { Link } from 'react-router-dom'
function Home() {

  return (
    <div className='flex flex-col'>

      <h2 className='text-gray-600 text-center mt-28 leading-normal text-5xl'> KONGU ENGINEERING COLLEGE</h2>
      <div className='flex flex-col-2 sm:flex-col-2 h-fit  w-full justify-center'>
        {/* <div className='hidden sm:block'>
<img className="w-full h-full object-cover" src={loginImg} alt=""/>
</div> */}

        <form className=' bg-gray-500 py-6 px-20 mt-20 rounded-lg'>


          <h2 className='text-4xl text-white font-bold mt-3 mb-40 text-center'>UPCOMING EVENTS</h2>


          <Link to='/Registration'>
            <div className='text-center'>
              <button type='button' className='btn font-bold bg-gray-700 text-white my-7 btn-default p-2'>REGISTER</button>

            </div>
          </Link>
          {/* <FileUpload /> */}
          {/* <button className='text-2xl text-white bg-black font-bold '>Sign up</button> */}
        </form>
      </div>
    </div>
  )
}

export default Home
