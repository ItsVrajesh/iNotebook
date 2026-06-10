import React from "react";

export default function Alert(props) {
  return (
    <div style={{ height: '50px' }}>
      {props.alert && (
        <div className="container mt-3">
          <div className="alert custom-alert d-flex align-items-center shadow-sm" role="alert">
            <i className="fa-solid fa-circle-check me-2 text-info"></i>
            <div>{props.alert.msg}</div>
          </div>
        </div>
      )}
    </div>
  );
}