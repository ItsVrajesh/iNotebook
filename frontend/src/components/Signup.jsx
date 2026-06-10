import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup(props) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/createuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    
    const json = await response.json()
    if (json.authtoken) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Account created successfully!", "success");
      navigate("/");
    } else {
      props.showAlert("Sorry, a user with this email already exists.", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div className="p-5 rounded-4 note-card-glass w-100" style={{ maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <i className="fa-solid fa-user-astronaut fs-1 mb-3" style={{ color: '#a855f7' }}></i>
          <h2 className="text-white fw-bold">Create Account</h2>
          <p className="text-secondary small">Join iNotebook to secure your ideas in the cloud.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-secondary small fw-bold">FULL NAME</label>
            <input type="text" className="form-control glass-input" id="name" name="name" onChange={onChange} placeholder="John Doe" minLength={3} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-secondary small fw-bold">EMAIL ADDRESS</label>
            <input type="email" className="form-control glass-input" id="email" name="email" onChange={onChange} placeholder="name@example.com" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-secondary small fw-bold">PASSWORD</label>
            <input type="password" className="form-control glass-input" id="password" name="password" onChange={onChange} placeholder="Min. 5 characters" minLength={5} required />
          </div>
          <div className="mb-4">
            <label htmlFor="cpassword" className="form-label text-secondary small fw-bold">CONFIRM PASSWORD</label>
            <input type="password" className="form-control glass-input" id="cpassword" name="cpassword" onChange={onChange} placeholder="Repeat password" minLength={5} required />
          </div>
          
          <button type="submit" className="btn-neon w-100 py-2 mb-3" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)' }}>Sign Up</button>
          
          <div className="text-center mt-3">
            <span className="text-secondary small">Already have an account? </span>
            <Link to="/login" className="text-info text-decoration-none small fw-bold">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  )
}