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

appResource.post('/', (req, res) => {
    let resourceName = req.body.resource_name; 
    if (!resourceName) {
        return res.status(400).json({error: 'Rsource name is required'});
    }
    let newResource = {
        resource_id: addResource.length + 1,
        resource_name: resourceName,
        resource_description: req.body.resource_description || null
    }
    addResource.push(newResource);
    res.status(201).json(newResource);
});


module.exports = appResource;
