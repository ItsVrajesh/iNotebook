import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContex";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const { showAlert } = props;
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

let navigate = useNavigate();

  useEffect(() => {
    // ONLY fetch notes if a token exists in local storage
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  // --- NEW: Search State ---
  const [searchQuery, setSearchQuery] = useState("");

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Note updated successfully!", "success"); // <-- Added this
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // --- NEW: Live Filtering Logic ---
  // This creates a new array containing only notes that match the search text in their title, description, or tag
  const filteredNotes = notes.filter((n) => {
    const query = searchQuery.toLowerCase();
    return (
      (n.title && n.title.toLowerCase().includes(query)) ||
      (n.description && n.description.toLowerCase().includes(query)) ||
      (n.tag && n.tag.toLowerCase().includes(query))
    );
  });

  return (
    <>
      <AddNote showAlert={showAlert} />
      <button
        ref={ref}
        type="button"
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

      {/* Edit Modal (Unchanged) */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              backgroundColor: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="modal-header border-bottom-0">
              <h1 className="modal-title fs-5 text-white">Edit Note</h1>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">
                    TITLE
                  </label>
                  <input
                    type="text"
                    className="form-control glass-input"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">
                    TAG CATEGORY
                  </label>
                  <select
                    className="form-select glass-input"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    style={{ cursor: "pointer" }}
                  >
                    <option value="General" style={{ background: "#0f172a" }}>
                      🏷️ General
                    </option>
                    <option value="Work" style={{ background: "#0f172a" }}>
                      💼 Work
                    </option>
                    <option value="Coding" style={{ background: "#0f172a" }}>
                      💻 Coding
                    </option>
                    <option value="Study" style={{ background: "#0f172a" }}>
                      📚 Study
                    </option>
                    <option value="Personal" style={{ background: "#0f172a" }}>
                      🎯 Personal
                    </option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">
                    DESCRIPTION
                  </label>
                  <textarea
                    rows="4"
                    className="form-control glass-input"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer border-top-0">
              <button
                ref={refClose}
                type="button"
                className="btn btn-outline-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn-neon">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="container my-5">
        {/* --- NEW: Header with Search Bar --- */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h2 className="mb-0 text-white">Your Collection</h2>

          <div
            className="position-relative"
            style={{ maxWidth: "300px", width: "100%" }}
          >
            <i
              className="fa-solid fa-magnifying-glass position-absolute text-secondary"
              style={{
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            ></i>
            <input
              type="text"
              className="form-control glass-input w-100 shadow-sm"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "45px", borderRadius: "20px" }} // Increased to 45px
            />
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="masonry-container">
        {notes.length === 0 && <div className="text-secondary text-center w-100 mt-5">No notes to display. Create one above!</div>}
        {notes.length > 0 && filteredNotes.length === 0 && (
          <div className="text-secondary text-center w-100 mt-5">No notes found matching "{searchQuery}"</div>
        )}

          {/* --- CHANGED: Mapping over filteredNotes instead of notes --- */}
          {filteredNotes.map((note) => <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />)}
        </div>
      </div>
    </>
  );
}
