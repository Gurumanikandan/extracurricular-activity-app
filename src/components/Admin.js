import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
function Admin() {
  return (
    <div>

      <div className='flex flex-col-2 sm:flex-col-2 h-fit  w-full justify-center'>
        {/* <div className='hidden sm:block'>
    <img className="w-full h-full object-cover" src={loginImg} alt=""/>
    </div> */}



        <form className=' bg-gray-500 py-20 px-24 mt-36 w rounded-lg'>


          <h2 className='text-3xl text-white font-bold  mb-2  text-center'>ADMIN PAGE</h2>
          <Link to='/Update'>  <div className='text-center'>
            <button type='button' className='btn font-bold bg-gray-700 text-white my-7 btn-default p-2'>UPDATE ANNOUNCEMENT</button>

          </div></Link>

          <div className='text-center'>
            <Link to='/registrations'>
              <div className='text-center'>
                <button type='button' className='btn font-bold bg-gray-700 text-white my-7 btn-default p-2'>VIEW RECORDS</button>
              </div>
            </Link>
          </div>
        </form>
      </div>
      <Navbar />
    </div>
  )
}

export default Admin


