import React, { useContext, useState, useRef } from "react";
import NoteContext from "../context/notes/NoteContex";

export default function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;
  // Set default tag to "General" instead of empty string
  const [note, setNote] = useState({ title: "", description: "", tag: "General" });
  
  const closeRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    if (!note.title || !note.description) return;
    
    addNote(note.title, note.description, note.tag);
    // Reset to General after saving
    setNote({ title: "", description: "", tag: "General" }); 
    closeRef.current.click(); 
    props.showAlert("New note created successfully!", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-center mb-5">
        <button 
          type="button" 
          className="btn w-100 py-3 rounded-4 transition-all" 
          data-bs-toggle="modal" 
          data-bs-target="#addNoteModal"
          style={{ 
            maxWidth: '700px', 
            backgroundColor: 'rgba(255,255,255,0.03)', 
            border: '1px dashed rgba(255,255,255,0.2)',
            color: '#94a3b8'
          }}
          onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.08)';
              e.target.style.color = '#ffffff';
          }}
          onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.03)';
              e.target.style.color = '#94a3b8';
          }}
        >
          <i className="fa-solid fa-plus me-2"></i> New Note
        </button>
      </div>

      <div className="modal fade" id="addNoteModal" tabIndex="-1" aria-labelledby="addNoteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            
            <div className="modal-header border-bottom-0 pb-0">
              <h1 className="modal-title fs-5 text-white" id="addNoteModalLabel">
                <i className="fa-solid fa-file-circle-plus me-2" style={{ color: '#a855f7' }}></i>
                Create New Note
              </h1>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <div className="modal-body mt-2">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label text-secondary small fw-bold">TITLE</label>
                  <input type="text" className="form-control glass-input" id="title" name="title" value={note.title} placeholder="Enter note title..." onChange={onChange} required />
                </div>
                
                {/* --- CHANGED TO DROPDOWN --- */}
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label text-secondary small fw-bold">TAG CATEGORY</label>
                  <select 
                    className="form-select glass-input" 
                    id="tag" 
                    name="tag" 
                    value={note.tag} 
                    onChange={onChange}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Added background colors to options so they are readable in dark mode drop-downs */}
                    <option value="General" style={{background: '#0f172a'}}>🏷️ General</option>
                    <option value="Work" style={{background: '#0f172a'}}>💼 Work</option>
                    <option value="Coding" style={{background: '#0f172a'}}>💻 Coding</option>
                    <option value="Study" style={{background: '#0f172a'}}>📚 Study</option>
                    <option value="Personal" style={{background: '#0f172a'}}>🎯 Personal</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label text-secondary small fw-bold">DESCRIPTION</label>
                  <textarea rows="4" className="form-control glass-input" id="description" name="description" value={note.description} placeholder="Type something incredible..." onChange={onChange} required></textarea>
                </div>
              </form>
            </div>

            <div className="modal-footer border-top-0 pt-0">
              <button ref={closeRef} type="button" className="btn btn-outline-light" data-bs-dismiss="modal">Cancel</button>
              <button onClick={handleClick} type="button" className="btn-neon">Save Note</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}