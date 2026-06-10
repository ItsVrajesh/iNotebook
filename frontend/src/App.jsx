import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";   // <-- Add this import
import Signup from "./components/Signup"; // <-- Add this import
import Forgot from "./components/Forgot";
import Reset from "./components/Reset";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => { setAlert(null); }, 3000);
  };

  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        
        {/* Container removed so components can be full-width! */}
        <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            
            {/* ADD THESE TWO LINES */}
            <Route exact path="/forgot-password" element={<Forgot showAlert={showAlert} />} />
            <Route exact path="/reset-password/:id/:token" element={<Reset showAlert={showAlert} />} />
          </Routes>
        
      </Router>
    </NoteState>
    </>
  );
}

export default App;