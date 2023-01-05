import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Navbar'
import { useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { storage } from "../firebase-config";
import DataGridTable from "./DataGrid"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function User() {

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

   const [file, setFile] = useState("");

   // progress
   const [percent, setPercent] = useState(0);

   // Handle file upload event and update state
   function handleChange(event) {
      setFile(event.target.files[0]);
   }

   const handleUpload = () => {
      if (!file) {
         alert("Please upload an image first!");
         return;
      }

      const storageRef = ref(storage, `/files/${file.name}`);

      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         "state_changed",
         (snapshot) => {
            const percent = Math.round(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // update progress
            setPercent(percent);
         },
         (err) => console.log(err),
         () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
               console.log(url);
            });
         }
      );
   };

   return (
      <div>
         <div className='flex flex-col-2 sm:flex-col-2 h-fit  w-full justify-center'>

            <form className=' bg-gray-500 py-5 px-12 mt-40 w-auto rounded-lg' onSubmit={handleSubmit(onSubmit)}>


               <h2 className='text-4xl text-white font-bold  mb-2  text-center'>USER PAGE</h2>

               <div className='flex flex-col text-left   text-gray-100 py-2'>
                  <label>Name</label>
                  <input {...register("name", { required: "Name is required", maxLength: 80 })} aria-invalid={errors.name ? "true" : "false"} placeholder="Name" />
                  {errors.name?.type === 'required' && <p class='error-text' role="alert">First name is required</p>}

               </div>
               <div className='flex flex-col text-left text-gray-100 py-2'>
                  <label>College Regno</label>
                  <input {...register("regNo", { required: "Roll number is required", maxLength: 8 })} placeholder="RegNo" />
                  {errors.regNo && <p class='error-text' role="alert">{errors.regNo?.message}</p>}

               </div>

               <div className='flex flex-col text-gray-100 py-2'>
                  <label>Department</label>
                  <input {...register("dept", { required: "Department name is required" })} placeholder="dept" />
                  {errors.dept && <p class='error-text' role="alert">{errors.dept?.message}</p>}

               </div>
               <div className='flex flex-row text-gray-100  py-4'>
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
                  {/* <input type="text"  className='text-black'/> */}

                  <select className='text-black w-1/4 ml-10' id="cars">

                     <option value="volvo">First Year</option>
                     <option value="volvo">Second Year</option>
                     <option value="volvo">Third Year</option>
                     <option value="volvo">Final Year</option></select></div>

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
               <div className='flex flex-col text-gray-100 py-2'>

                  <label>Organizer Details<br />(college/company name and address)</label>
                  <textarea {...register("address")} placeholder="address" />
                  {errors.address && <p class='error-text' role="alert">{errors.address?.message}</p>}
                  <textarea rows={2} cols={10} className='text-black'></textarea>
               </div>
               <div className='flex flex-row text-black-100  py-4'>
                  <label>Event</label>
                  {checkedList.map(({ id, name, checked }) => (
                     <label key={id}>
                        <input type="radio" {...register("eventType", { required: "Event is required" })} placeholder="eventType" value={name} />
                        {name}
                     </label>
                  ))}
                  {errors.eventType && <p class='error-text' role="alert">{errors.eventType?.message}</p>}
                  {/* <input type="text"  className='text-black'/> */}

                  <input type="radio" id="tech" name="fav_language" className='ml-4' value="tech" />
                  <label for="tech" className='text-black '>Technical Event</label>
                  <input type="radio" id="non-tech" name="fav_language" className='ml-4' value="non-tech" />
                  <label for="non-tech" className='text-black'>Non-technical Event</label>
                  <input type="radio" id="non-tech" name="fav_language" className='ml-4' value="non-tech" />
                  <label for="non-tech" className='text-black'>Both</label>

               </div>
               <div className='flex flex-col text-gray-100 py-2'>
                  <label>Number of events registered</label>
                  <input type="number" className='text-black' />
               </div>
               <div className='flex flex-col text-left   text-gray-100 py-2'>
                  <label>Name of the events</label>
                  <input type="text" className='  text-black' />
               </div>
               <div className='flex flex-row text-gray-100 pt-5 '>
                  <label>Event Date</label>
                  <input type="date" className='text-black w-2/5 ml-2'></input>
               </div>
               <div className='flex flex-row text-gray-100 pt-5 '>
                  <label className=''>Certificate</label>

                  <div>
                     <input type="file" onChange={handleChange} accept="/image/*" />
                     <button onClick={handleUpload}>Upload to Firebase</button>
                     <p>{percent} "% done"</p>
                  </div>


               </div>
               <p className='ml-24'>If having one or more certificate,<br />combine and upload it as<br /> a single pdf file with maximum size of 5MB</p>
               <div className='text-center pt-3 '>

                  <button type='button' onClick={() => {
                     reset()
                  }} className='btn font-bold bg-gray-700 text-white mt-4 btn-default p-2 '>RESET</button>
                  <button type='button' className='btn font-bold bg-gray-700 text-white  mt-4 btn-default p-2  ml-16'>SUBMIT</button>
               </div>
            </form>
         </div>
         <Navbar />

         <ToastContainer />

      </div>

   )
}

export default User
