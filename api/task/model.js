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

function getByTaskId(task_id) {
  return db("tasks")
    .where({ task_id })
    .first()
    .then((task) => {
      if (task) {
        return { ...task, task_completed: !!task.task_completed }; 
      } else {
        return null;
      }
    });
}

async function addTask(task) {
  try {
    const [id] = await db("tasks").insert(task)
    console.log(id)
    const newTask = await getByTaskId(id)
    if (newTask) {
      return newTask;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    }
}
 
module.exports = {
  getTasks,
  // getByTaskId,
  addTask,
};
