// build your `Project` model here
const db = require('../../data/dbConfig')

function getProjects() {
    return db ('projects')
}

function addProject(newProject){
    return db("projects")
        .insert(newProject)
        .then((ids) => {
            return {project_id: ids[0], ...newProject}
        })
}

module.exports = {
    getProjects,
    addProject,
}