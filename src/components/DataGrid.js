import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Moment from "react-moment";
import "moment-timezone";
import React from "react";
import { storage } from "../firebase-config";

const DataGridTable = () => {
  const [data, setData] = useState([]);
  const [columnDefs] = useState([
    { field: "json.name", headerName: "Name" },
    { field: "json.year", headerName: "Year" },
    { field: "json.dept", headerName: "Department" },
    { field: "json.address", headerName: "Address" },
    { field: "json.email", headerName: "Email" },
    { field: "json.phnno", headerName: "Phone Number" },
    { field: "json.regNo", headerName: "Reg No" },
    { field: "json.nameOfEvent", headerName: "Name Of Event" },
    { field: "json.noOfEvent", headerName: "No of Event" },
    { field: "json.eventType", headerName: "Event Type" },
    {
      field: "json.eventDate",
      headerName: "Event Date",
      valueFormatter: dateFormatter,
    },
    {
      headerName: 'File',
      field: 'files',
      cellRenderer: fileDownloadCellRenderer,
    },
  ]);

  function dateFormatter(params) {
    console.log(params.data.json.eventDate);
    return params.data.json.eventDate
      ? new Date(params.data.json.eventDate).toLocaleDateString()
      : "";
  }

  const fetchPost = async () => {
    const db = getFirestore();
    await getDocs(collection(db, "beforeRegistration")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(newData);
        console.log(newData);
      }
    );
  };

  function fileDownloadCellRenderer(params) {
    const fileUrl = params.data.json.files;
    return React.createElement('a', { href: fileUrl, download: true }, 'Download');
  }


  async function downloadFile(fileName) {
    const storageRef = storage().ref();
    const fileRef = storageRef.child(fileName);

    try {
      const downloadUrl = await fileRef.getDownloadURL();
      window.open(downloadUrl);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 1300 }}>
      <AgGridReact rowData={data} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
};

export default DataGridTable;
