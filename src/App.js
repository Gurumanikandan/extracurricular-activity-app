import "./App.css";
import React, { useState } from "react";
import Update from "./components/Update.js";
import Admin from "./components/Admin.js";
import User from "./components/User.js";
import Registration from "./components/Registration.js";
import ViewRecords from "./components/view-records";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import Signup from "./components/Signup.js";
import Signin from "./components/Signin.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
function App() {
  const [auth, setAuth] = useState(false);

  console.log(auth);
  return (
    <Router>
      <Navbar auth={auth} />
      <Routes>
        <Route path="/" exact element={<Home />} />

        {auth && <Route path="/User" element={<Registration />} />}
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin setAuth={setAuth} />} />
        <Route path="/registrations" element={<ViewRecords />} />
      </Routes>
    </Router>
  );
}
export default App;
