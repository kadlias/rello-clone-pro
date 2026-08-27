const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { id, content, column } = req.body;
  if (!id || !content || !["todo", "doing", "done"].includes(column)) {
    return res.status(422).json({ error: "Invalid task payload" });
  }
  const task = { id, content: content.trim(), column };
  tasks.push(task);
  res.json(task);
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  if (!tasks.some(t => t.id === id)) return res.status(404).json({ error: "Task not found" });
  tasks = tasks.map(t =>
    t.id === id ? { ...t, ...req.body } : t
  );
  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on 3000"));
