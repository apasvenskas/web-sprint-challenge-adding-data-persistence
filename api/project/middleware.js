


const checkRouter = (req, res, next) => {
    const newProject = req.body;
    if(!newProject.project_name){
        res.status(400).json({message: "Please provide project name"})
    } else {
        next()
    }
};

module.exports = checkRouter;