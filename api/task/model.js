// build your `Task` model here
const db = require("../../data/dbConfig");

function getTasks() {
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

async function getByTaskId(id) {
  try {
    const task = await db("tasks").where({ id }).first();
    console.log("task", task);
    return task;
  } catch (err) {
    console.error(err);
  }
}

async function addTask(task) {
  try {
    const [id] = await db("tasks").insert(task);
    console.log(id);
    return getByTaskId(id);
  } catch (err) {
    console.error(err);
    }
}
 
module.exports = {
  getTasks,
  // getByTaskId,
  addTask,
};
