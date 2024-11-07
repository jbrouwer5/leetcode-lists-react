import React from "react";
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <h3 className={styles.heading}>About</h3>
      <p className={styles.paragraph}>
        I made this page to help those entering or returning to the interview
        process. When I started interview prep, I noticed two things. First, the
        favorite curated LeetCode lists were spread across different sites and
        hard to find without someone showing you where to look. Second, I found
        there to be a lack of consistent format and approach in LeetCode
        solutions.
      </p>
      <p className={styles.paragraph}>
        Therefore, I decided to put all the best lists in one place, with easily
        accessible solutions where I tried to use consistent formatting, vocab,
        and approach for understanding.
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
