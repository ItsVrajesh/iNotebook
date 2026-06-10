import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContex";

const getTagTheme = (tag) => {
  const normalized = tag?.toLowerCase().trim();
  switch (normalized) {
    case "work":
      // Blue
      return {
        icon: "💼",
        color: "#38bdf8",
        glow: "rgba(56, 189, 248, 0.4)",
        shadow: "rgba(56, 189, 248, 0.15)",
      };
    case "coding":
      // Orange
      return {
        icon: "💻",
        color: "#fb923c",
        glow: "rgba(251, 146, 60, 0.4)",
        shadow: "rgba(251, 146, 60, 0.15)",
      };
    case "study":
      // Purple
      return {
        icon: "📚",
        color: "#c084fc",
        glow: "rgba(192, 132, 252, 0.4)",
        shadow: "rgba(192, 132, 252, 0.15)",
      };
    case "personal":
      // Green
      return {
        icon: "🎯",
        color: "#4ade80",
        glow: "rgba(74, 222, 128, 0.4)",
        shadow: "rgba(74, 222, 128, 0.15)",
      };
    default:
      // Default Slate/Gray
      return {
        icon: "🏷️",
        color: "#94a3b8",
        glow: "rgba(255, 255, 255, 0.2)",
        shadow: "rgba(0, 0, 0, 0.3)",
      };
  }
};

export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props;
  const theme = getTagTheme(note.tag);

  // Helper to ensure the tag text is always nicely capitalized
  const formatTagText = (text) => {
    if (!text) return "General";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div className="masonry-item">
      <div
        className="card note-card-glass p-3 position-relative"
        style={{ "--card-glow": theme.glow, "--card-shadow": theme.shadow }}
      >
        <div className="card-body d-flex flex-column p-0 h-100">
          {/* Note Content */}
          <div className="mb-4">
            <h5 className="card-title text-white mb-2 fw-bold">{note.title}</h5>
            <p
              className="card-text text-secondary"
              style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem" }}
            >
              {note.description}
            </p>
          </div>

          {/* Footer: Tag & Actions pinned to the bottom */}
          <div
            className="d-flex justify-content-between align-items-center mt-auto pt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {/* The Colorful Tag */}
            <span
              className="fw-bold d-flex align-items-center"
              style={{
                color: theme.color,
                fontSize: "0.85rem",
                letterSpacing: "0.5px",
              }}
            >
              <span className="me-2 fs-6">{theme.icon}</span>
              {formatTagText(note.tag)}
            </span>

            {/* Action Buttons with Hover Colors */}
            <div className="d-flex gap-3">
              <i
                className="fa-solid fa-trash-can text-secondary"
                style={{ cursor: "pointer", transition: "color 0.2s" }}
                onMouseOver={(e) => (e.target.style.color = "#ef4444")}
                onMouseOut={(e) => (e.target.style.color = "#6c757d")}
                onClick={() => {
                  deleteNote(note._id);
                  showAlert("Note deleted successfully!", "success"); // <-- Added this
                }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square text-secondary"
                style={{ cursor: "pointer", transition: "color 0.2s" }}
                onMouseOver={(e) => (e.target.style.color = "#38bdf8")}
                onMouseOut={(e) => (e.target.style.color = "#6c757d")}
                onClick={() => {
                  updateNote(note);
                  showAlert("Note Updated successfully!", "success"); // <-- Added this
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
