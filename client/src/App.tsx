import { useEffect, useState } from "react";

interface Task {
  id: string;
  content: string;
  column: string;
}

const columns = ["todo", "doing", "done"];
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => { fetch(`${API_URL}/tasks`).then(r => r.json()).then(setTasks).catch(() => undefined); }, []);

  const addTask = (column: string) => {
    const content = prompt("Task:");
    if (!content) return;

    const task = { id: crypto.randomUUID(), content, column };
    fetch(`${API_URL}/tasks`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(task) })
      .then(response => { if (!response.ok) throw new Error("Could not create task"); return response.json(); })
      .then(saved => setTasks(prev => [...prev, saved]));
  };

  const moveTask = (id: string, newColumn: string) => {
    fetch(`${API_URL}/tasks/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ column: newColumn }) })
      .then(response => { if (!response.ok) throw new Error("Could not move task"); })
      .then(() => setTasks(prev => prev.map(task => task.id === id ? { ...task, column: newColumn } : task)));
  };

  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      {columns.map(col => (
        <div
          key={col}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            const id = e.dataTransfer.getData("text");
            moveTask(id, col);
          }}
          style={{ background: "#eee", padding: 10, width: 250 }}
        >
          <h2>{col}</h2>
          <button onClick={() => addTask(col)}>Add</button>

          {tasks
            .filter(t => t.column === col)
            .map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={e =>
                  e.dataTransfer.setData("text", task.id)
                }
                style={{
                  background: "white",
                  margin: "10px 0",
                  padding: 10,
                  cursor: "grab"
                }}
              >
                {task.content}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
