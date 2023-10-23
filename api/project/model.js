// build your `Project` model here
const db = require('../../data/dbConfig')

function getProjects() {
    return db('projects')
}

function addProject(project){
    return db('projects')
        .insert(project)
        .then(ids => {
            return db('projects')
                .where({id: ids[0]})
                .first();
        })
}

module.exports = {
    getProjects,
    addProject,
}