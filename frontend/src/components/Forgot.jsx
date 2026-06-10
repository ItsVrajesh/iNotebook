import React, { useState } from 'react';

export default function Forgot(props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const json = await response.json();
      
      if (response.ok) {
        props.showAlert("If an account exists, a reset link has been sent to that email.", "success");
        setEmail(""); // Clear the input
      } else {
        props.showAlert(json.error || "An error occurred.", "danger");
      }
    } catch (error) {
      props.showAlert("Server error. Please try again later.", "danger");
    }
    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="p-5 rounded-4 note-card-glass w-100 position-relative overflow-hidden shadow-lg" style={{ maxWidth: '450px' }}>
        
        {/* Header */}
        <div className="text-center mb-4 position-relative z-1">
          <div className="d-inline-flex justify-content-center align-items-center rounded-circle mb-3 shadow" style={{ width: '60px', height: '60px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <i className="fa-solid fa-envelope-open-text fs-3" style={{ color: '#38bdf8' }}></i>
          </div>
          <h2 className="text-white fw-bolder mb-1">Recover Account</h2>
          <p className="text-secondary small">Enter your email and we will send you a reset link.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="position-relative z-1">
          <div className="mb-4">
            <label htmlFor="email" className="form-label text-secondary small fw-bold">EMAIL ADDRESS</label>
            <input 
              type="email" 
              className="form-control glass-input" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@example.com" 
              required 
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn-neon w-100 py-3 rounded-3 fw-bold">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}