import React, { Suspense, useEffect, useState } from "react";
import Navbar from './Navbar'
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { getFirestore } from "firebase/firestore";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Update() {
   const { register, formState: { errors }, handleSubmit, reset } = useForm();
   const [data, setData] = useState("");
   const [file, setFile] = useState(null);
   const [fileRef, setFileRef] = useState(null);
   const [fileDownloadURL, setFileDownloadURL] = useState(null);

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFile(file);
      let fileRef = ref(storage, file.name);
      setFileRef(fileRef);
      const storageRef = ref(storage, `/files/${file.name}`)
      handleSubmitFile(e, storageRef);
   };

   async function handleSubmitFile(e, storageRef) {
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
         getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('uploaded successfully', downloadURL);
            setFileDownloadURL(downloadURL);
            toast.success("File uploaded successfully !", {
               position: toast.POSITION.BOTTOM_RIGHT,
            });
         });
      });
   };

   const onSubmit = (data) => {
      if (data && data != "") {
         console.log(data)
         setData(JSON.stringify(data))
         const db = getFirestore();
         data.broucher = fileDownloadURL;
         addDoc(collection(db, "announcements"), {
            json: data,
         })
            .then(() => {
               toast.success("Announcement saved successfully !", {
                  position: toast.POSITION.BOTTOM_RIGHT,
               });
               reset();
            })
            .catch((error) => {
               console.log(error);
            });
      } else {
         toast.waring("Check the Registration again !", {
            position: toast.POSITION.BOTTOM_RIGHT,
         });
      }
   };

   return (
      <div>
         <div className='flex flex-col-2 sm:flex-col-2 h-fit  w-full justify-center'>
            <form className=' bg-gray-500 py-10 px-12 mt-36 w-auto rounded-lg' onSubmit={handleSubmit(onSubmit)}>
               <h2 className='text-3xl text-white font-bold  mb-2  text-center'>UPDATE<br /> ANNOUNCEMENT</h2>
               <div className='flex flex-col text-left   text-gray-100 py-2'>
                  <label>Title</label>
                  <input type="text" className='  text-black'
                     {...register("title", {
                        required: "Title is required",
                        maxLength: 80,
                     })}
                     aria-invalid={errors.title ? "true" : "false"}
                     placeholder="Title" />
                  {errors.title?.type === "required" && (
                     <p class="error-text" role="alert">
                        Title is required
                     </p>
                  )}
               </div>
               <div className='flex flex-col text-left text-gray-100 py-2'>
                  <label>Description</label>
                  <input type="text" className='  text-black'
                     {...register("description", {
                        required: "Description is required",
                        maxLength: 80,
                     })}
                     aria-invalid={errors.description ? "true" : "false"}
                     placeholder="Description" />
                  {errors.description?.type === "required" && (
                     <p class="error-text" role="alert">
                        Description is required
                     </p>
                  )}
               </div>
               <div className='flex flex-col text-gray-100 py-2'>
                  <label>Link</label>
                  <input type="url" className='text-black'
                     {...register("link", {
                        required: "Link is required",
                        maxLength: 80,
                     })}
                     aria-invalid={errors.link ? "true" : "false"}
                     placeholder="Link" />
                  {errors.link?.type === "required" && (
                     <p class="error-text" role="alert">
                        Link is required
                     </p>
                  )}
               </div>
               <div className='flex flex-row text-gray-100 py-4'>
                  <label>Broucher</label>
                  <input type="file" className='text-black px-6'
                     {...register("broucher", {
                        required: "Description is required",
                        maxLength: 80,
                     })}
                     aria-invalid={errors.broucher ? "true" : "false"}
                     placeholder="Broucher"
                     onChange={handleFileChange} />
                  {errors.broucher?.type === "required" && (
                     <p class="error-text" role="alert">
                        Broucher is required
                     </p>
                  )}
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
