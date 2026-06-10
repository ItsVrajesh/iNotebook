import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Force a full state reset so Home.jsx forgets the workspace state
    window.location.href = "/";
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top py-3 transition-all" style={{ background: isLoggedIn ? 'rgba(15, 23, 42, 0.7)' : 'transparent', backdropFilter: isLoggedIn ? 'blur(10px)' : 'none', borderBottom: isLoggedIn ? '1px solid rgba(255,255,255,0.05)' : 'none', zIndex: 100 }}>
      <div className="container-fluid px-4 px-lg-5">
        
        {/* Brand */}
        <Link className="navbar-brand fw-bolder fs-4" to="/" style={{ color: '#f8fafc', letterSpacing: '-0.5px' }}>
          <i className="fa-solid fa-layer-group me-2" style={{ color: '#38bdf8' }}></i>
          i<span style={{ color: '#38bdf8' }}>Notebook</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent" style={{ filter: 'invert(1)' }}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          
          {/* Internal Links - ONLY visible if logged in! */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link px-3 ${location.pathname === "/" ? "text-white fw-bold" : "text-secondary"}`} to="/">Workspace</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link px-3 ${location.pathname === "/about" ? "text-white fw-bold" : "text-secondary"}`} to="/about">Archive</Link>
                </li>
              </>
            )}
          </ul>
          
          {/* Right Side: Modern Auth UI */}
          <div className="d-flex align-items-center gap-4 mt-3 mt-lg-0">
            {!isLoggedIn ? (
              <>
                {/* Modern subtle text link for login */}
                <Link className="text-secondary text-decoration-none fw-bold transition-all" to="/login" onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#6c757d'}>Sign in</Link>
                {/* Modern pill button for signup */}
                <Link className="btn-neon px-4 py-2 rounded-pill text-decoration-none" to="/signup" style={{ fontSize: '0.95rem' }}>Get Started</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-bold" style={{ fontSize: '0.9rem' }}>Sign out</button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}