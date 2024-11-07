import React from "react";
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <h3 className={styles.heading}>About</h3>
      <p className={styles.paragraph}>
        I made this page to help those entering or returning to the interview
        process. When I started interview prep, I found there to be a lack of
        consistently formatted and explained LeetCode solutions.
      </p>
      <p className={styles.paragraph}>
        I wanted to make it easier for others to find and understand common
        interview problems. I aimed to have my solutions consistently formatted
        in terms of explanation and code.
      </p>
      <p className={styles.paragraph}>Good luck with your interview!</p>
      <p className={styles.paragraph}>
        Write brouwercodes@gmail.com with any questions, requests for new
        solutions or problem lists, or bug reports!
      </p>

      <h3 className={styles.heading}>References</h3>
      <a
        href="https://www.techinterviewhandbook.org/grind75/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Grind75
      </a>
      <br />
      <a
        href="https://seanprashad.com/leetcode-patterns/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Sean Prashad's LeetCode Patterns
      </a>
      <br />
      <a
        href="https://leetcode.com/studyplan/top-interview-150/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Top Interview 150
      </a>
      <br />
    </div>
  );
}

export default About;
