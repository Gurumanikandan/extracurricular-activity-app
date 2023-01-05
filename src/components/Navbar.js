
import React, { useState } from 'react'
// import Buttonpage from './Buttonpage';

import { Link } from 'react-router-dom'
const Navbar = ({ auth }) => {

  console.log(auth)

  let [open, setOpen] = useState(false);
  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between py-2 bg-blue-100  md:px-10 px-8'>
        <div className='font-bold text-2xl cursor-pointer flex items-center font-[poppins] text-gray-800'>
          <span className='text-4xl text-indigo-600 pt-6 mr-1'><ion-icon name="logo-slack"></ion-icon>
          </span>

        </div>
        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
        </div>
        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-blue-100 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-1000 ease-in ${open ? 'top-20' : 'top-[-490px]'}`}>

          <Link to='/'>
            <li className='flex px-4 py-5 hover:text-blue-600'>

              <ion-icon name="home-outline" size="large"></ion-icon>

              <a href="/" className=' py-1 px-1 text-2xl'>Home</a></li>
          </Link>
          <Link to='/admin'>
            <li className='px-4 py-4 flex hover:text-blue-600'>

              <ion-icon name="lock-closed-outline" size="large"></ion-icon>
              <a href="index.html" className=' px-1 py-1 text-2xl'>Admin</a></li>
          </Link>
          {auth &&
            <Link to='/user'>
              <li className=' flex px-4 py-4 hover:text-blue-600'>

                <ion-icon name="person-outline" size="large"></ion-icon>
                <a href="index.html" className=' px-1 py-1 text-2xl hover:text-blue-600'>User</a></li></Link>
          }


          <Link to='/Signup'> <li className='text-center px-4 '>
            <button className='bg-blue-500 w-5/5 text-2xl text-white px-2 my-3 shadow-xl hover:bg-blue-300 hover:text-black'>Sign up</button></li>
          </Link>
          <Link to='/Signin'> <li className='text-center px-4 '>
            <button className='bg-blue-500 w-5/5 text-2xl text-white px-3  shadow-xl hover:bg-blue-300 hover:text-black'>User</button></li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
