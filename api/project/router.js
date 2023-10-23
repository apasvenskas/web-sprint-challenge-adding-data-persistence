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
    if (!newProject.project_name) {
      // res.status(400).json({message: 'Please provide a project name'});
      throw new Error("Please provide a project name");
    } else {
      newProject.project_completed = newProject.project_completed ? 1 : 0;
      const ids = await addProject("projects").insert(newProject);
      res.status(201).json([{ project_id: ids[0], ...newProject }]);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
