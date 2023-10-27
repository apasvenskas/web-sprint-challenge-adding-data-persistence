// build your `/api/resources` router here
const express = require('express');
const { getResources, addResource } = require('./model');
const appResource = express.Router();

appResource.use(express.json());


appResource.get('/', (req, res) => {
    getResources()
        .then(resources => {
            res.status(200).json(resources)
        }) 
        .catch(err => {
            console.error(err)
            res.status(500).json({message: "Error getting resources"})
        })
});

appResource.post('/', (req, res, next) => {
    let currentResource = req.body; 
    if (currentResource.resource_name) {
        addResource(currentResource)
          .then(inserted => {
            res.status(201).json(inserted);
          })
          .catch(next);
      } else {
        next({ status: 400, message: 'Please provide a name for the resource' })
      }
  
});


module.exports = appResource;

  // let newResource = {
    //     // resource_id: addResource.length + 1,
    //     resource_name: resourceName,
    //     resource_description: resourceDescription || null
    // }
    // addResource(newResource)
    // .then(resource => {
    //     res.status(201).json(resource)
    // }).catch(error => {
    //     res.status(500).json({error: error.message})
    // })
