import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase-config"
import { createUserWithEmailAndPassword } from "firebase/auth"


function Signup() {

   const navigate = useNavigate();


   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");


   const handleSubmit = (e) => {
      console.log("working")
      e.preventDefault();
      createUserWithEmailAndPassword(auth, email, password).then((res) => {
         console.log(res);
         navigate("/Signin")

      }).catch((err) => {
         console.log(err);
      })

   }



   return (
      <div>

         <div className='flex flex-col-2 sm:flex-col-2 h-fit  w-full justify-center'>
            {/* <div className='hidden sm:block'>
       <img className="w-full h-full object-cover" src={loginImg} alt=""/>
       </div> */}



            <form className=' bg-gray-500 py-10 px-20 mt-40 rounded-lg' onSubmit={handleSubmit}>


               <h2 className='text-4xl text-white font-bold mt-3 text-center'>SIGN UP</h2>

               <div className='flex flex-col text-left text-black-100 py-2'>
                  <label>Initial Name</label>
                  <input type="text" />


               </div>
               <div className='flex flex-col text-left text-black-100 py-2'>
                  <label>Last Name</label>
                  <input type="text" />
               </div>
               <div className='flex flex-col text-black-100 py-2'>
                  <label>Email</label>
                  <input type="email" onChange={(e) => { setEmail(e.target.value) }} />
               </div>
               <div className='flex flex-col text-black-100 py-2'>
                  <label>Password</label>
                  <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
               </div>
               <div className='flex flex-col text-black-100 py-2'>
                  <label>Confirm Password</label>
                  <input type="password" />
               </div><button type='button' type="submit" className='btn font-bold bg-gray-700 text-white my-7 btn-default p-2'>REGISTER</button>

               {/* <button className='text-2xl text-white bg-black font-bold '>Sign up</button> */}
            </form>
         </div>
         <Navbar />
      </div>
   )
}

export default Signup
