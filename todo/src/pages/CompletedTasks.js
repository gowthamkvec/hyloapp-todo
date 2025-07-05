import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";

const CompletedTasks = () => {
  const navigate = useNavigate();
  const activeUser = JSON.parse(localStorage.getItem("ActiveUser"));
  const [tasks, setTasks] = useState([]);

  // ✅ Fetch all tasks for the user
  useEffect(() => {
    if (activeUser?.email) {
      axios
        .get(`http://localhost:5000/api/tasks/${activeUser.email}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, [activeUser?.email]);

  // 🔁 Undo completed
  const handleUndo = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/update/${taskId}`, {
        completed: false,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: false } : task
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // ❌ Delete task
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/delete/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // 🧹 Filter only completed
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="container">
      <h2>Completed Tasks</h2>
      <button className="btn" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      {completedTasks.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        completedTasks.map((task) => (
          <div key={task._id} className="task-item">
            <span style={{ textDecoration: "line-through" }}>{task.text}</span>
            <button onClick={() => handleUndo(task._id)}>Undo</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedTasks;
