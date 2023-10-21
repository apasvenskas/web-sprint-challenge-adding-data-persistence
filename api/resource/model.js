// build your `Resource` model here
const db = require('../../data/dbConfig')

function getResources() {
    db('resources');
}

function addResource(resource) {
    return db('resources').insert(resource).returning('*');
}

module.exports = {
    getResources,
    addResource
}