// build your `/api/resources` router here
const express = require('express');
const { resource } = require('../server');
const appResource = express();

appResource.use(express.json());

let resources = [];

appResource.post('/api/resources', (req, res) => {
    let resourceName = req.body.resource_name; 
    if (!resourceName) {
        return res.status(400).json({error: 'Rsource name is required'});
    }
    let newResource = {
        resource_id: resources.length + 1,
        resource_name: resourceName,
        resource_description: req.body.resource_description || null
    }
    resource.push(newResource);
    res.status(201).json(newResource);
});

appResource.get('/api/resources', (req, res) => {
    res.status(200).json(resources);
});

module.exports = appResource;
