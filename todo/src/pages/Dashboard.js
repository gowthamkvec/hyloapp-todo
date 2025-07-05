import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import './dashboard.css';

const Dashboard = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const activeUser = JSON.parse(localStorage.getItem("ActiveUser"));

  // 🔄 Fetch tasks from backend
  useEffect(() => {
    if (activeUser?.email) {
      axios.get(`http://localhost:5000/api/tasks/${activeUser.email}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error(" Error fetching tasks:", err));
    }
  }, [activeUser?.email]);

  // ➕ Add new task
  const handleAddTask = () => {
    if (!task.trim()) return;

    axios.post("http://localhost:5000/api/tasks/add", {
      email: activeUser.email,
      text: task,
    })
    .then((res) => {
      setTasks(prev => [...prev, res.data]); // append new task
      setTask(""); // clear input
    })
    .catch((err) => console.error(" Error adding task:", err));
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("ActiveUser");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Welcome, {activeUser?.email}</h2>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="task-input">
        <h3>Add Task</h3>
        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button className="btn" onClick={() => navigate("/pending")}>
          Pending Tasks
        </button>
        <button className="btn" onClick={() => navigate("/completed")}>
          Completed Tasks
        </button>
      </div>

      <div className="task-list" style={{ marginTop: "30px" }}>
        <h3>Your Tasks</h3>
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="task-item">
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.text}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
