// build your `/api/tasks` router here
const express = require("express");
const router = express.Router();

const { addTask, getTasks, getByTaskId } = require("./model");
// const Project = require("../project/model");

router.get("/", async (req, res) => {
  try {
    const tasks = await getTasks();
    console.log(tasks);
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
    console.log(taskWithProjectInfo)
    res.status(200).json(taskWithProjectInfo);
  } catch (err) {
    res.status(500).json({ message: "Failed to get tasks" });
  }
});

router.post("/", async (req, res) => {
  const { task_description, task_notes, task_completed, project_id } = req.body;
  if (!task_description || !project_id) {
    return res
      .status(400)
      .json({ message: "Please provide task_description and project_id" });
  }
  const completed = task_completed ? 1 : 0;
  try {
    const newTask = await addTask.add({
      task_description,
      task_notes,
      completed,
      project_id,
    });
    res
      .status(201)
      .json({ ...newTask, task_completed: !!newTask.task_completed });
  } catch (err) {
    res.status(500).json({ message: "Failed to create new task" });
  }
});

module.exports = router;
