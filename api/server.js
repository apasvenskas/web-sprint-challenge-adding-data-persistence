// build your server here and require it from index.js
// const checkRouter = require('./project/middleware')
const projectrouter = require('./project/router')
const resourceRouter = require('./resource/router')
const taskRouter = require('./task/router')

const express = require('express')
const db = require('../data/dbConfig')

const server = express()

server.use(express.json())

server.use('/api/projects', projectrouter)
// server.use('/api/projects', projectrouter)
server.use('/api/resources', resourceRouter)
server.use('/api/tasks', taskRouter)

server.get('/test', async (rreq, res) => {
    try {
        const result = await db('project');
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to get data'})
    }
});

server.use('*', (req, res) => {
    res.json({api: 'Server is running'})
})

module.exports = server