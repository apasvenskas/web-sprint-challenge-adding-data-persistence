// build your `/api/projects` router here
const express = require("express");
// const router = express.Router();
const router = express.Router();

const {getProjects, addProject} = require("./model");
router.use(express.json());

router.get("/", (req, res) => {
  getProjects()
    .then(projects => {
      projects = projects.map(project => ({
        ...project,
        project_completed:!!project.project_completed,
      }));
      res.status(200).json(projects);
    })
    .catch(err => {
      console.error('Error object', err);
      res.status(500).json({ message: "Error getting the projects" });
    });
});


router.post("/", async (req, res) => {
  const project = req.body;
  try {
    if (!project.project_name) {
      // res.status(400).json({message: 'Please provide a project name'});
      throw new Error("Please provide a project name");
    } else {
      project.project_completed = project.project_completed ? 1 : 0;
      const ids = await addProject("projects").insert(project);
      res.status(201).json([{ project_id: ids[0], ...project }]);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
