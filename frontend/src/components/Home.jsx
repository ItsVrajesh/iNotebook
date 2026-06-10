import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import Notes from "./Notes";

export default function Home(props) {
  const { showAlert } = props;
  const [inWorkspace, setInWorkspace] = useState(false);
  let navigate = useNavigate();

  // Smart UX: If they are already logged in, automatically open the workspace for them!
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setInWorkspace(true);
    }
  }, []);

  // Triggered when "Open Workspace" is clicked in the Hero
  const handleEnterWorkspace = () => {
    if (localStorage.getItem("token")) {
      setInWorkspace(true);
      showAlert("Welcome to your workspace!", "success");
    } else {
      // If no token exists, bounce them to the login page
      showAlert("Please login or sign up to access your workspace.", "warning");
      navigate("/login");
    }
  };

  return (
    <div>
      {!inWorkspace ? (
        <div className="fade-in-workspace">
          <Hero onEnter={handleEnterWorkspace} />
        </div>
      ) : (
        <div>
          <Notes showAlert={showAlert} />
        </div>
      )}
    </div>
  );
}