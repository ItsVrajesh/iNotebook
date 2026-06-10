import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContex";

export default function About() {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    if (notes.length === 0) getNotes();
    // eslint-disable-next-line
  }, []);

  const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString() : "Unknown Date";
  
  return (
    <div className="container my-5">
      <h2 className="mb-5 text-center text-white">Note History Timeline</h2>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {notes.length === 0 ? (
            <div className="text-center text-secondary mt-5 p-5 note-card-glass">
              <h4>No history found</h4>
            </div>
          ) : (
            <div className="position-relative" style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', marginLeft: '20px' }}>
              {[...notes].reverse().map((note, index) => (
                <div key={note._id || index} className="position-relative mb-4 ps-4 pt-1">
                  <span className="position-absolute top-0 start-0 translate-middle rounded-circle" style={{ width: '16px', height: '16px', background: '#38bdf8', left: '0px'}}></span>
                  <div className="note-card-glass p-3 ms-2">
                    <h5 className="text-white fw-bold">{note.title}</h5>
                    <p className="text-secondary small mt-2 mb-0">Created on: {formatDate(note.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}