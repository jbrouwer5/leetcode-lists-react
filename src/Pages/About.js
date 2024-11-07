// About.js
import React from "react";

function About() {
  return (
    <>
      <h3>About</h3>
      <p>
        I made this page to help those entering or returning to the interview
        process. When I started interview prep, I found there to be a lack of
        consistently formatted and explained leetcode solutions.
      </p>
      <p>
        I wanted to make it easier for others to find and understand common
        interview problems. I aimed to have my solutions consistently formatted
        in terms of explanation and code.
      </p>
      <p>Good luck with your interview!</p>
      <p>
        Write brouwercodes@gmail.com with any questions, requests for new
        solutions or problem lists, or bug reports!
      </p>

      <h3>References</h3>
      <a
        href="https://www.techinterviewhandbook.org/grind75/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Grind75
      </a>
      <br />
      <a
        href="https://seanprashad.com/leetcode-patterns/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sean Prashad's LeetCode Patterns
      </a>
      <br />
      <a
        href="https://leetcode.com/studyplan/top-interview-150/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Top Interview 150
      </a>
      <br />
    </>
  );   
}

export default About;
