import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import ProgressBar from "./ProgressBar";
import styles from "./QuestionList.module.css";

const QuestionList = () => {
  const [checks, setChecks] = useState(
    JSON.parse(localStorage.getItem("checkedQuestions")) || {}
  );
  const location = useLocation();
  const questions = location.state?.data || "Default Data";

  const [data, setData] = useState(questions);
  const [filter, setFilter] = useState({
    checked: "all",
    difficulty: "all",
    pattern: "all",
  });

  const difficultyCounts = (checks, data) => {
    return data.reduce(
      (acc, question) => {
        acc["All"]++;
        acc[question.difficulty]++;

        if (question.id in checks && checks[question.id]) {
          acc["AllSolved"]++;
          acc[question.difficulty + "Solved"]++;
        }

        return acc;
      },
      {
        Easy: 0,
        Medium: 0,
        Hard: 0,
        All: 0,
        EasySolved: 0,
        MediumSolved: 0,
        HardSolved: 0,
        AllSolved: 0,
      }
    );
  };

  const counts = useMemo(() => difficultyCounts(checks, data), [checks, data]);

  useEffect(() => {
    setData(questions);
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("checkedQuestions", JSON.stringify(checks));
  }, [checks]);

  const toggleCheck = useCallback((id) => {
    setChecks((prevChecks) => ({
      ...prevChecks,
      [id]: !prevChecks[id],
    }));
  }, []);

  const handleFilterChange = useCallback((e) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const filteredData = useMemo(() => {
    return data
      .filter((question) => {
        if (
          filter.checked !== "all" &&
          (checks[question.id] === true) !== (filter.checked === "checked")
        ) {
          return false;
        }
        if (
          filter.difficulty !== "all" &&
          question.difficulty !== filter.difficulty
        ) {
          return false;
        }
        if (
          filter.pattern !== "all" &&
          (!question.pattern || !question.pattern.includes(filter.pattern))
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });
  }, [data, filter, checks]);

  return (
    <div>
      {/* Progress Bar and Counts */}
      <div className={styles.progressBarContainer}>
        <ProgressBar
          label="All"
          solved={counts.AllSolved}
          total={counts.All}
          color="#000000"
        />
        <ProgressBar
          label="Easy"
          solved={counts.EasySolved}
          total={counts.Easy}
          color="#00dd00"
        />
        <ProgressBar
          label="Medium"
          solved={counts.MediumSolved}
          total={counts.Medium}
          color="#f0ad4e"
        />
        <ProgressBar
          label="Hard"
          solved={counts.HardSolved}
          total={counts.Hard}
          color="#dd0000"
        />
      </div>

      {/* Filter Controls */}
      <div className={styles.filterControls}>
        <label>
          Show:
          <select
            name="checked"
            value={filter.checked}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="checked">Checked</option>
            <option value="unchecked">Unchecked</option>
          </select>
        </label>
        <label>
          Difficulty:
          <select
            name="difficulty"
            value={filter.difficulty}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <label>
          Pattern:
          <select
            name="pattern"
            value={filter.pattern}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            {[...new Set(questions.flatMap((q) => q.pattern || []))].map(
              (pattern) => (
                <option key={pattern} value={pattern}>
                  {pattern}
                </option>
              )
            )}
          </select>
        </label>
      </div>

      {/* Table */}
      {filteredData.length === 0 ? (
        <p>No questions match your filters.</p>
      ) : (
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Check</th>
                <th>Title</th>
                <th>Solutions</th>
                <th>Difficulty</th>
                <th>Patterns</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((question) => (
                <tr key={question.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checks[question.id] || false}
                      onChange={() => {
                        toggleCheck(question.id);
                      }}
                    />
                  </td>
                  <td>
                    {question.slug ? (
                      <a
                        href={`https://leetcode.com/problems/${question.slug}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {question.title}
                      </a>
                    ) : (
                      question.title
                    )}
                  </td>
                  <td>
                    {question.solution ? (
                      <a
                        href={question.solution}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Solution
                      </a>
                    ) : (
                      "Coming Soon"
                    )}
                  </td>
                  <td>{question.difficulty}</td>
                  <td>{question.pattern ? question.pattern.join(", ") : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
