import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    
    const json = await response.json()
    if (json.authtoken) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Successfully logged in!", "success");
      navigate("/"); // Redirect to home/workspace
    } else {
      props.showAlert("Invalid credentials. Please try again.", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div className="p-5 rounded-4 note-card-glass w-100" style={{ maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <i className="fa-solid fa-bolt fs-1 mb-3" style={{ color: '#38bdf8' }}></i>
          <h2 className="text-white fw-bold">Welcome Back</h2>
          <p className="text-secondary small">Enter your credentials to access your workspace.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label text-secondary small fw-bold">EMAIL ADDRESS</label>
            <input type="email" className="form-control glass-input" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="name@example.com" required />
          </div>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label htmlFor="password" className="form-label text-secondary small fw-bold mb-0">PASSWORD</label>
              
              {/* THIS IS THE NEW LINK */}
              <Link to="/forgot-password" className="text-info text-decoration-none small transition-all" style={{ opacity: 0.8 }} onMouseOver={e=>e.target.style.opacity=1} onMouseOut={e=>e.target.style.opacity=0.8}>
                Forgot password?
              </Link>
              
            </div>
            <input type="password" className="form-control glass-input" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="••••••••" required />
          </div>
          
          <button type="submit" className="btn-neon w-100 py-2 mb-3">Login to Workspace</button>
          
          <div className="text-center mt-3">
            <span className="text-secondary small">Don't have an account? </span>
            <Link to="/signup" className="text-info text-decoration-none small fw-bold">Sign up here</Link>
          </div>
        </form>
      </div>
    </div>
  )
}