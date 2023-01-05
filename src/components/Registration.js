import React, { Suspense, useEffect, useState } from "react";
import Navbar from './Navbar'
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataGrid from './DataGrid';

function Registration() {

   const { register, formState: { errors }, handleSubmit, reset } = useForm();
   const [data, setData] = useState("");

   const options = ["First", "Second", "Third"];
   const radioOptions = [
      { id: 1, name: "Technical Event" },
      { id: 2, name: "Non Technical Event" },
      { id: 3, name: "Both" }
   ];

   const radioOptionsForStatus = [
      { id: 1, name: "Pending" },
      { id: 2, name: "Completed" },
   ];

   function uncheckAll(radioOptions) {
      return radioOptions.map((radioOption) => ({
         ...radioOption,
         checked: false
      }));
   }

   const [checkedList, setCheckedList] = useState(uncheckAll(radioOptions));
   const [checkedListForStatus, setCheckedListForStatus] = useState(uncheckAll(radioOptionsForStatus));


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
         <Navbar />
         <div className='flex flex-col-2 sm:flex-col-2 h-fit  w-full justify-center'>
            <div>

               <form className=' bg-gray-500 py-5 px-12 mt-40 w-auto rounded-lg' onSubmit={handleSubmit(onSubmit)}>

                  <h2 className='text-4xl text-white font-bold  mb-2  text-center'>REGISTRATION FOR<br /> PARTICIPATING EVENT</h2>

                  <div className='flex flex-col text-left   text-black-100 py-2'>
                     <label>Name</label>
                     <input {...register("name", { required: "Name is required", maxLength: 80 })} aria-invalid={errors.name ? "true" : "false"} placeholder="Name" />
                     {errors.name?.type === 'required' && <p class='error-text' role="alert">First name is required</p>}
                  </div>

                  <div className='flex flex-col text-left text-black-100 py-2'>
                     <label>College Rollno</label>
                     <input {...register("regNo", { required: "Roll number is required", maxLength: 8 })} placeholder="RegNo" />
                     {errors.regNo && <p class='error-text' role="alert">{errors.regNo?.message}</p>}
                  </div>
                  <div className='flex flex-col text-black-100 py-2'>
                     <label>Department</label>
                     <input {...register("dept", { required: "Department name is required" })} placeholder="dept" />
                     {errors.dept && <p class='error-text' role="alert">{errors.dept?.message}</p>}
                  </div>
                  <div className='flex flex-row text-black-100  py-4'>
                     <label>Year</label>
                     <select className='text-black w-1/4 ml-10'
                        {...register("year", { required: "Year is required" })}>
                        {options.map((value) => (
                           <option value={value} key={value}>
                              {value}
                           </option>
                        ))}
                     </select>
                     {errors.year && <p class='error-text' role="alert">{errors.year?.message}</p>}
                  </div>
                  <div className='flex flex-col text-black-100 py-2'>
                     <label>Phone Number</label>
                     <input {...register("phnno", {
                        required: "Phone Number is required",
                        pattern: {
                           value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
                           message: "Invalid Phone Number"
                        }
                     })}
                        aria-invalid={errors.phnno ? "true" : "false"}
                        placeholder="phnno" />
                     {errors.phnno && <p class='error-text' role="alert">{errors.phnno?.message}</p>}
                  </div>
                  <div className='flex flex-col text-black-100 py-2'>
                     <label>Email</label>
                     <input  {...register("email", {
                        required: "Email Address is required",
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: "Invalid email address"
                        }
                     })}
                        aria-invalid={errors.email ? "true" : "false"}
                        placeholder="email" />
                     {errors.email && <p class='error-text' role="alert">{errors.email?.message}</p>}
                  </div>
                  <div className='flex flex-col text-black-100 py-2'>
                     <label>Organizer Details<br />(college/company name and address)</label>
                     <textarea {...register("address")} placeholder="address" />
                     {errors.address && <p class='error-text' role="alert">{errors.address?.message}</p>}
                  </div>
                  <div className='flex flex-col text-black-100  py-2'>
                     <label>Event</label>
                     {checkedList.map(({ id, name, checked }) => (
                        <label key={id}>
                           <input type="radio" {...register("eventType", { required: "Event is required" })} placeholder="eventType" value={name} />
                           {name}
                        </label>
                     ))}
                     {errors.eventType && <p class='error-text' role="alert">{errors.eventType?.message}</p>}
                  </div>
                  <div className='flex flex-col text-black-100  py-2'>
                     <label>Status</label>
                     {checkedListForStatus.map(({ id, name, checked }) => (
                        <label key={id}>
                           <input type="radio" {...register("status", { required: "Status is required" })} placeholder="status" value={name} />
                           {name}
                        </label>
                     ))}
                     {errors.eventType && <p class='error-text' role="alert">{errors.eventType?.message}</p>}
                  </div>
                  <div className='flex flex-col text-black-100 py-2'>
                     <label>Number of events registered</label>
                     <input {...register("noOfEvent", { required: "Number of Event is required" })} placeholder="noOfEvent" />
                     {errors.noOfEvent && <p class='error-text' role="alert">{errors.noOfEvent?.message}</p>}
                  </div>
                  <div className='flex flex-col text-left   text-black-100 py-2'>
                     <label>Name of the events</label>
                     <input {...register("nameOfEvent", { required: "Name of Events is required" })} placeholder="nameOfEvent" />
                     {errors.nameOfEvent && <p class='error-text' role="alert">{errors.nameOfEvent?.message}</p>}
                  </div>
                  <div className='flex flex-col text-black-100 pt-5 '>
                     <label>Event Date</label>
                     <input type="date" {...register("eventDate", { required: "Event date is required", valueAsDate: true })} placeholder="eventDate" />
                     {errors.eventDate && <p class='error-text' role="alert">{errors.eventDate?.message}</p>}
                  </div>
                  <div className='text-center pt-3 '>
                     <button type='button' onClick={() => {
                        reset()
                     }} className='btn font-bold bg-gray-700 text-white mt-4 btn-default p-2 '>RESET</button>
                     <button type='submit' className='btn font-bold bg-gray-700 text-white  mt-4 btn-default p-2  ml-16'>SUBMIT</button>
                  </div>
               </form>
            </div>
         </div>
         <ToastContainer />
      </div>
   )
}

export default Registration
