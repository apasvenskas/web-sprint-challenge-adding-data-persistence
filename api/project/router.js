// build your `/api/projects` router here
const express = require("express");
const router = express.Router();

const {getProjects, addProject} = require("./model");
router.use(express.json());

const checkRouter = require('./middleware')

router.get("/", (req, res) => {
  getProjects()
    .then(projects => {
      let finalProjects = projects.map(project => ({
        ...project,
        project_completed:!!project.project_completed,
      }));
      res.status(200).json(finalProjects);
    })
    .catch(err => {
      console.error('Error object', err);
      res.status(500).json({ message: "Error getting the projects" });
    });
});


router.post("/", async (req, res) => {
  const newProject = req.body;
  try {
    if (typeof newProject.project_completed === "number") {
      newProject.project_completed = Boolean(newProject.project_completed)
    } else {
      newProject.project_completed = false;
    }
    const project = await addProject(newProject);
    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.use(checkRouter)


module.exports = router;
