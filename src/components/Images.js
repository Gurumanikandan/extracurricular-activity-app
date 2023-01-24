import { getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import pic from "../assests/1.jpg";
import pic2 from "../assests/2.jfif";
import pic3 from "../assests/3.jfif";
const images = [{
    id: 1,
    src: "https://firebasestorage.googleapis.com/v0/b/eventmanagement-kongu.appspot.com/o/Superman.jpg?alt=media&token=bca08e40-2f38-4157-ae68-8db25e6abee1",
    alt: "Image 1"
},
{
    id: 2,
    src: pic2,
    alt: "Image 2 "
},
{
    id: 3,
    src: pic3,
    alt: "Image 3"
}
]
export default images;
