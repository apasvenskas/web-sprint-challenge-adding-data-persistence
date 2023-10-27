// build your `/api/tasks` router here
const express = require("express");
const router = express.Router();

const { addTask, getTasks } = require("./model");
// const Project = require("../project/model");

router.get("/", async (req, res) => {
  try {
    const tasks = await getTasks();
    const taskWithProjectInfo = await Promise.all(
      tasks.map(async (task) => {
        return {
          ...task,
          project_name: task.project_name,
          project_description: task.project_description,
          task_completed: Boolean(task.task_completed),
        };
      })
    );
    res.status(200).json(taskWithProjectInfo);
  } catch (err) {
    res.status(500).json({ message: "Failed to get tasks" });
  }
});

router.post("/", async (req, res) => {
  const { task_description, task_notes, task_completed, project_id } = req.body;
  // const completed = task_completed ? 1 : 0;
  try {
    const newTask = await addTask({
      task_description,
      task_notes,
      task_completed,
      project_id,
    });
    console.log("newTask", newTask)
    res.status(201)
      .json({ ...newTask, task_completed: !!newTask.task_completed });
  } catch (err) {
    res.status(500).json({ message: "Failed to create new task" });
  }
});


module.exports = router;
