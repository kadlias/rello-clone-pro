import { useState } from "react";

interface Task {
  id: string;
  content: string;
  column: string;
}

const columns = ["todo", "doing", "done"];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (column: string) => {
    const content = prompt("Task:");
    if (!content) return;

    setTasks(prev => [
      ...prev,
      { id: crypto.randomUUID(), content, column }
    ]);
  };

  const moveTask = (id: string, newColumn: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, column: newColumn } : task
      )
    );
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
