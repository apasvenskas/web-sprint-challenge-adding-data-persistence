// build your `Resource` model here
const db = require('../../data/dbConfig');
// const { resource } = require('../server');

function getResources() {
    return db('resources')
    .select(['resource_id', 'resource_name', 'resource_description'])
}

function addResource(resources) {
    return db('resources').insert(resources).returning('*');
}

module.exports = {
    getResources,
    addResource
}