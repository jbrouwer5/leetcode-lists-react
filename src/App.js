import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import QuestionList from "./Pages/QuestionList";
import NotFound from "./Pages/NotFound";
import Grind75 from "./data/grind75.json";
import SeanPrashad from "./data/seanPrashad.json";
import Top150 from "./data/top150.json";
import "./App.css";

function App() {
  return (
    <Router basename="/leetcode">
      <h1>LeetCode Lists</h1>

      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/grind75"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              state={{ data: Grind75.data }}
            >
              Grind75
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/seanprashad"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              state={{ data: SeanPrashad.data }}
            >
              Sean Prashad
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leetcodetop150"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              state={{ data: Top150.data }}
            >
              LeetCode Top 150
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/grind75" element={<QuestionList />} />
        <Route path="/seanprashad" element={<QuestionList />} />
        <Route path="/leetcodetop150" element={<QuestionList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
