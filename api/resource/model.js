// build your `Resource` model here
const db = require('../../data/dbConfig');
// const { resource } = require('../server');

function getResources() {
    return db('resources')
    .select(['resource_id', 'resource_name', 'resource_description'])
}

function addResource(currentResource) {
        // return db("resources")
        //   .insert(currentResource, "resource_id")
        //   .then(([resource_id]) => db("currentResource").where({ resource_id }).first());
        return db("resources")
         .insert(currentResource)
         .then(() => currentResource)
      } 


module.exports = {
    getResources,
    addResource
}