// Contact.js
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import "../App.css";

const QuestionList = () => {
    const [checks, setChecks] = useState(JSON.parse(localStorage.getItem("checkedQuestions")) || {}); 
    const location = useLocation();
    const questions = location.state?.data || "Default Data";

    const [data, setData] = useState(questions);
    const [filter, setFilter] = useState({ checked: "all", difficulty: "all", pattern: "all" });


    const difficultyCounts = (checks, data) => {
        // Count solved questions by difficulty
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
            { Easy: 0, Medium: 0, Hard: 0, All: 0, EasySolved: 0, MediumSolved: 0, HardSolved: 0, AllSolved: 0 }
        );
    }

    const [counts, setCounts] = useState(difficultyCounts(checks, data));

    useEffect(() => {
      setCounts(difficultyCounts(checks, data));
    }, [checks, data]);

    useEffect(() => {
      setData(questions);
    }, [questions]);

    useEffect(() => {
      localStorage.setItem("checkedQuestions", JSON.stringify(checks));
    }, [checks]);

    // Handle checkbox change
    const toggleCheck = (id) => {
        if (id in checks) {
            setChecks({...checks, [id]: !checks[id]});
        }
        else {
            setChecks({...checks, [id]: true});
        }
    };
  
    // Handle filter changes
    const handleFilterChange = (e) => {
      setFilter({ ...filter, [e.target.name]: e.target.value });
    };
  
    // Filter data based on the filter state
    const filteredData = data
      .filter((question) => {
        if (filter.checked !== "all" && (checks[question.id] === true) !== (filter.checked === "checked")) {
          return false;
        }
        if (filter.difficulty !== "all" && question.difficulty !== filter.difficulty) {
          return false;
        }
        if (filter.pattern !== "all" && (!question.pattern || !question.pattern.includes(filter.pattern))) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });
  
    return (
      <div>      
        {/* Progress Bar and Counts */}
        <div className="progress-bar-container">
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
        <div>
          <label>
            Show:
            <select name="checked" value={filter.checked} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="checked">Checked</option>
              <option value="unchecked">Unchecked</option>
            </select>
          </label>
          <label>
            Difficulty:
            <select name="difficulty" value={filter.difficulty} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>
          <label>
            Pattern:
            <select name="pattern" value={filter.pattern} onChange={handleFilterChange}>
              <option value="all">All</option>
              {/* Generate tag options dynamically based on your tags */}
              {[...new Set(questions.flatMap(q => q.pattern || []))].map(pattern => (
                <option key={pattern} value={pattern}>{pattern}</option>
              ))}
            </select>
          </label>
        </div>
        
        {/* Table */}
        {filteredData.length === 0 ? (
          <p>No questions match your filters.</p>
        ) : (
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
                      <a href={`https://leetcode.com/problems/${question.slug}/`} target="_blank" rel="noopener noreferrer">
                        {question.title}
                      </a>
                    ) : (
                      question.title
                    )}
                  </td>
                  <td>
                    {question.solution ? (
                      <a href={question.solution} target="_blank" rel="noopener noreferrer">
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
        )}
      </div>
    );
  };
  
  export default QuestionList;

