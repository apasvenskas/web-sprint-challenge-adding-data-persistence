// build your `Task` model here
const db = require("../../data/dbConfig");

function getTasks() {
    console.log(db('tasks'));
  return db("tasks")
    .join("projects", "tasks.project_id", "projects.project_id")
    .select([
      "task_id",
      "task_description",
      "task_notes",
      "task_completed",
      "tasks.project_id as task_project_id",
      "project_name",
      "project_description",
    ]);
}

function getByTaskId(id) {
  return db("task").where({ id }).first();
}

async function addTask(task) {
  const [id] = await db("task").insert(task);
  return addTask(id);
}

module.exports = {
  getTasks,
  getByTaskId,
  addTask,
};
