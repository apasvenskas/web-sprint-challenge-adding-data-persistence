// build your `/api/tasks` router here
const express = require('express');
const router = express.Router();

const Task = require('./model');
const Project = require('../project/model')

router.post('/api/tasks', async (req, res) => {
    const { task_description, task_notes, task_completed, project_id } = req.body;
    if (!task_description || !project_id){
        return res.status(400).json({message: 'Please provide task_description and project_id'});
    }
    const completed = task_completed ? 1:0;
    try {
        const newTask = await Task.add({task_description, task_notes, completed, project_id})
        res.status(201).json({...newTask, task_completed: !!newTask.task_completed});
    } catch (err) {
        res.status(500).json({message: 'Failed to create new task'});
    }
});

router.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.getAll();
        const taskWithProjectInfo = await Promise.all(
            tasks.map(async (task) => {
                const project = await Project.getById(task.project_id);
                return {...task, project_name: project.project_name, project_description: 
                    project.project_description, task_completed: !!task.task_completed};
            })
        )
        res.status(200).json(taskWithProjectInfo);
    } catch(err){
        res.status(500).json({message: 'Failed to get tasks'});
    }
})

module.exports = router;