import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";

const PendingTasks = () => {
  const navigate = useNavigate();
  const activeUser = JSON.parse(localStorage.getItem("ActiveUser"));
  const [tasks, setTasks] = useState([]);

  //  Fetch tasks from backend for current user
  useEffect(() => {
    if (activeUser?.email) {
      axios
        .get(`http://localhost:5000/api/tasks/${activeUser.email}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, [activeUser?.email]);

  // Mark task as completed
  const handleComplete = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/update/${taskId}`, {
        completed: true,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: true } : task
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Filter only pending (not completed) tasks
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="container">
      <h2>Pending Tasks</h2>
      <button className="btn" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      {pendingTasks.length === 0 ? (
        <p>No pending tasks.</p>
      ) : (
        pendingTasks.map((task) => (
          <div key={task._id} className="task-item">
            <span>{task.text}</span>
            <button onClick={() => handleComplete(task._id)}>Finished</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingTasks;


