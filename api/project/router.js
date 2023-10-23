// build your `/api/projects` router here
const express = require("express");
// const router = express.Router();
const router = express.Router();

const {getProjects, addProject} = require("./model");
router.use(express.json());

router.get("/", (req, res) => {
  console.log('projects before')
  getProjects()
    .then(projects => {
      console.log('Projects after', projects)
      let finalProjects = projects.map(project => ({
        ...project,
        project_completed:!!projects.project_completed,
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
    if (typeof newProject.project_completed === "boolean") {
      newProject.project_completed = Number(newProject.project_completed);
    } 
    const project = await addProject(newProject);
    res.status(201).json([project])
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
