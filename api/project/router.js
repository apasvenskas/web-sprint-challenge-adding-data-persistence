// build your `/api/projects` router here
const express = require('express');
// const router = express.Router();
const router = express.Router();

const Rsources = require('./model')
router.use(express.json());

router.post('/api/resources', (req, res) => {
    const resources = req.body;
    if (!resources.resource_name){
        res.status(400).json({message: 'Please provide a resource name'});
    } else {
        Rsources('resource')
            .insert(resources)
            .then(ids => {
                res.status(201).json({resource_id: ids[0], ...resources});
            })
            .catch(err => {
                res.status(500).json({message: 'Error adding the resources'});
            })
    }
});

router.get('/api/resources', (req, res) => {
    Rsources('resources')
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(err => {
            res.status(500).json({message: 'Error getting the resources'});
        })
})

router.post('/api/projects', (req, res) => {
    const project = req.body;
    if(!project.project_name){
        res.status(400).json({message: 'Please provide a project name'});
    } else {
        project.project_completed =project. project_completed ? 1 : 0;
        Rsources('projects')
            .insert(project)
            .then(ids => {
                res.status(201).json({project_id: ids[0], ...project});
            });
    }
});

router.get('/api/projects', (req, res) => {
    Rsources('projects')
      .then(projects => {
        projects = projects.map(project => ({
          ...project,
          project_completed: !!project.project_completed,
        }));
        res.status(200).json(projects);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error getting the projects' });
      });
  });
  
module.exports = router
