import React, { Suspense, useEffect, useState } from "react";
import Navbar from './Navbar'
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { getFirestore } from "firebase/firestore";

function Update() {
   const { register, formState: { errors }, handleSubmit, reset } = useForm();
   const [data, setData] = useState("");
   const onSubmit = (data) => {
      if (data && data != "") {
         console.log(data)
         setData(JSON.stringify(data))
         const db = getFirestore();
         const docRef = addDoc(collection(db, "beforeRegistration"), {
            json: data
         }).then(() => {
            toast.success('Event registered successfully !', {
               position: toast.POSITION.BOTTOM_RIGHT
            });
            reset();
         }).catch((error) => {
            console.log(error);
         });
      } else {
         toast.waring('Check the Registration agin !', {
            position: toast.POSITION.BOTTOM_RIGHT
         });
      }
   };

   return (
      <div>
         <div className='flex flex-col-2 sm:flex-col-2 h-fit  w-full justify-center'>
            <form className=' bg-gray-500 py-10 px-12 mt-36 w-auto rounded-lg'>


               <h2 className='text-3xl text-white font-bold  mb-2  text-center'>UPDATE<br /> ANNOUNCEMENT</h2>

               <div className='flex flex-col text-left   text-gray-100 py-2'>
                  <label>Title</label>
                  <input type="text" className='  text-black' />


               </div>
               <div className='flex flex-col text-left text-gray-100 py-2'>
                  <label>Description</label>
                  <input type="text" className='text-black' />
               </div>

               <div className='flex flex-col text-gray-100 py-2'>
                  <label>Link</label>
                  <input type="url" className='text-black' />
               </div>
               <div className='flex flex-row text-gray-100 py-4'>
                  <label>Broucher</label>
                  <input type="file" className='text-black px-6' />
               </div>
               <div className='text-center pt-3 '>
                  <button type='button' onClick={() => {
                     reset()
                  }} className='btn font-bold bg-gray-700 text-white mt-4 btn-default p-2 '>cancel</button>
                  <button type='submit' className='btn font-bold bg-gray-700 text-white  mt-4 btn-default p-2  ml-16'>UPDATE</button>
               </div>


            </form>
         </div>
         <Navbar />
      </div>
   )
}

export default Update
