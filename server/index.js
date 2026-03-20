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
  const task = req.body;
  tasks.push(task);
  res.json(task);
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.map(t =>
    t.id === id ? { ...t, ...req.body } : t
  );
  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on 3000"));
