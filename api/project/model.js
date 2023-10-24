// build your `Project` model here
const db = require('../../data/dbConfig')

function getProjects() {
    return db ('projects')
        .then(projects =>{
            return projects.map(project => ({
                ...project, project_completed: !!project.project_completed
            }))
        })
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