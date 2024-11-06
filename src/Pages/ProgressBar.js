// ProgressBar.js
import React from "react";
import "../App.css"; 

const ProgressBar = ({ label, solved, total, color }) => {
  const percentage = total > 0 ? (solved / total) * 100 : 0;

  return (
    <>
      <div className="progress-bar-margin">
        <strong>{label}:</strong> {solved} / {total} questions solved
      </div>
      <div className="progress-bar-border">
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
            background: color,
          }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
