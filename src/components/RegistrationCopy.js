import { useState } from "react";
import { useForm } from "react-hook-form";
import DataGrid from './DataGrid';

function RegistrationCopy() {

   return (
      <div>
         <div className='flex flex-col-2 sm:flex-col-2 h-fit  w-full justify-center'>
            <div>

               <form className=' bg-gray-500 py-5 px-12 mt-40 w-auto rounded-lg'>

                  <DataGrid />
               </form>
            </div>
         </div>
      </div>

   );
}

export default RegistrationCopy
