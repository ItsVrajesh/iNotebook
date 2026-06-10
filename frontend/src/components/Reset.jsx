import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Reset(props) {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  
  // React Router hook to grab the ID and Token directly from the URL
  const { id, token } = useParams(); 
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== cpassword) {
      props.showAlert("Passwords do not match!", "danger");
      return;
    }

    try {
      // Send the new password to the backend, along with the ID and Token from the URL
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password/${id}/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const json = await response.json();
      
      if (response.ok) {
        props.showAlert("Password reset successfully! You can now log in.", "success");
        navigate("/login"); // Kick them to the login page
      } else {
        props.showAlert(json.error || "Reset link is invalid or has expired.", "danger");
      }
    } catch (error) {
      props.showAlert("Server error. Please try again later.", "danger");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="p-5 rounded-4 note-card-glass w-100 position-relative overflow-hidden shadow-lg" style={{ maxWidth: '450px' }}>
        
        <div className="text-center mb-4 position-relative z-1">
          <div className="d-inline-flex justify-content-center align-items-center rounded-circle mb-3 shadow" style={{ width: '60px', height: '60px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #a855f7' }}>
            <i className="fa-solid fa-key fs-3" style={{ color: '#a855f7' }}></i>
          </div>
          <h2 className="text-white fw-bolder mb-1">Set New Password</h2>
          <p className="text-secondary small">Please enter your new secure password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="position-relative z-1">
          <div className="mb-3">
            <label className="form-label text-secondary small fw-bold">NEW PASSWORD</label>
            <input type="password" className="form-control glass-input" minLength={5} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 5 characters" required />
          </div>
          <div className="mb-4">
            <label className="form-label text-secondary small fw-bold">CONFIRM NEW PASSWORD</label>
            <input type="password" className="form-control glass-input" minLength={5} value={cpassword} onChange={(e) => setCpassword(e.target.value)} placeholder="Repeat password" required />
          </div>
          
          <button type="submit" className="btn-neon w-100 py-3 rounded-3 fw-bold" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)' }}>
            Save New Password
          </button>
        </form>
      </div>
    </div>
  );
}