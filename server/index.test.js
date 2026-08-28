const test = require("node:test");
const assert = require("node:assert/strict");
const { app, resetTasks } = require("./index");

async function withServer(run) {
  resetTasks();
  const server = app.listen(0);
  try { await run(`http://127.0.0.1:${server.address().port}`); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

test("creates, lists and moves a task", () => withServer(async base => {
  const task = { id: "task-1", content: "Ship portfolio", column: "todo" };
  assert.equal((await fetch(`${base}/tasks`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(task) })).status, 201);
  assert.deepEqual(await (await fetch(`${base}/tasks`)).json(), [task]);
  assert.equal((await fetch(`${base}/tasks/task-1`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ column: "done" }) })).status, 200);
  assert.equal((await (await fetch(`${base}/tasks`)).json())[0].column, "done");
}));

test("rejects invalid tasks and missing ids", () => withServer(async base => {
  assert.equal((await fetch(`${base}/tasks`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({}) })).status, 422);
  assert.equal((await fetch(`${base}/tasks/missing`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ column: "done" }) })).status, 404);
}));
