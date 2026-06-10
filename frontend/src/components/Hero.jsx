import React from 'react';

export default function Hero({ onEnter }) {
  return (
    <div className="d-flex justify-content-center align-items-center position-relative" style={{ minHeight: '85vh', marginTop: '-80px' }}>
      
      {/* Huge, subtle ambient glow behind the text */}
      <div className="position-absolute" style={{
        width: '60vw', height: '60vw', maxWidth: '800px', maxHeight: '800px',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(0,0,0,0) 70%)', 
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, filter: 'blur(60px)'
      }}></div>

      {/* Hero Content (No more box!) */}
      <div className="text-center position-relative" style={{ width: '100%', maxWidth: '850px', zIndex: 1, padding: '2rem' }}>
        
        {/* Modern SaaS "Update" Badge */}
        <div className="mb-4 d-inline-block px-3 py-1 rounded-pill" style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', color: '#38bdf8', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1px' }}>
          INOTEBOOK 2.0 IS LIVE
        </div>

        {/* Massive Gradient Typography */}
        <h1 className="display-3 fw-bolder mb-4" style={{ 
          background: 'linear-gradient(180deg, #ffffff 0%, #94a3b8 100%)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-2px',
          lineHeight: '1.1'
        }}>
          The modern way to <br/> organize your mind.
        </h1>

        {/* Clean, readable subtitle */}
        <p className="fs-5 fw-light mb-5 mx-auto" style={{ color: '#cbd5e1', lineHeight: '1.6', maxWidth: '600px' }}>
          A beautiful, lightning-fast workspace to capture ideas, structure your thoughts, and keep everything perfectly synced in the cloud.
        </p>

        {/* Single, powerful CTA Button */}
        <div className="d-flex justify-content-center">
          <button onClick={onEnter} className="btn-neon d-flex align-items-center justify-content-center gap-2 rounded-pill shadow-lg transition-all" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
            Open your Workspace <i className="fa-solid fa-arrow-right ms-1"></i>
          </button>
        </div>
        
      </div>
    </div>
  );
}