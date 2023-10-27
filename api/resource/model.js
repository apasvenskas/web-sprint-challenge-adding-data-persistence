// build your `Resource` model here
const db = require('../../data/dbConfig');
// const { resource } = require('../server');

function getResources() {
    return db('resources')
    .select(['resource_id', 'resource_name', 'resource_description'])
}

function addResource(currentResource) {
    // return db('resources').insert(currentResource).returning('*');
    // function insert(resource) {
        return db("resources")
          .insert(currentResource, "resource_id")
          .then(([resource_id]) => db("resources").where({ resource_id }).first());
      } 


module.exports = {
    getResources,
    addResource
}