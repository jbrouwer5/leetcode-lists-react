// ProgressBar.js
import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ label, solved, total, color }) => {
  const percentage = total > 0 ? (solved / total) * 100 : 0;

  return (
    <>
      <div className={styles.ProgressBarMargin}>
        <strong>{label}:</strong> {solved} / {total} Questions Solved
      </div>
      <div className={styles.ProgressBarBorder}>
        <div
          className={styles.ProgressBar}
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
