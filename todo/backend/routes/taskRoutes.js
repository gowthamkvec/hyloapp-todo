const express = require("express");
const router = express.Router();
const Task = require("../model/Task");

// ➕ Add Task
router.post("/add", async (req, res) => {
  const { email, text } = req.body;
  try {
    const newTask = new Task({ email, text });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📃 Get Tasks by Email
router.get("/:email", async (req, res) => {
  try {
    const tasks = await Task.find({ email: req.params.email });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Task (e.g., mark complete/incomplete)
router.put("/update/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete Task
router.delete("/delete/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
