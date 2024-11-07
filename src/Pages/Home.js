import React from "react";
import styles from "./Home.module.css";

function Home() {
  return (
    <p className={styles.homeText}>
      A collection of curated LeetCode problems along with linked solutions.
    </p>
  );
}

export default Home;
