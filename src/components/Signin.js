import React, { useState } from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config"

import { useNavigate } from "react-router-dom"
function Signin({ setAuth }) {


  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onSubmitHandler = (e) => {
    console.log("fonde")
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((e) => {
      console.log("success");
      setAuth(true)
      navigate("/user")
    }).catch(
      (e) => {
        console.log(e)
      }
    )

  }


  return (
    <div>

      <div className='flex flex-col-2 sm:flex-col-2 h-fit  w-full justify-center'>




        <form className=' bg-gray-500 py-10 px-20 mt-40 rounded-lg' onSubmit={onSubmitHandler}>


          <h2 className='text-4xl text-white font-bold mt-3 text-center'>SIGN IN</h2>
          <div className='flex flex-col text-black-100 py-2'>
            <label>Email</label>
            <input type="email" onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className='flex flex-col text-black-100 py-2'>
            <label>Password</label>
            <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
          </div>

          <button type='submit' className='btn font-bold bg-gray-700 text-white my-7 btn-default p-2'>SIGN IN</button>



          {/* <button className='text-2xl text-white bg-black font-bold '>Sign up</button> */}
        </form>
      </div>
      <Navbar />
    </div>
  )
}

export default Signin

