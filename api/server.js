// build your server here and require it from index.js
// const checkRouter = require('./project/middleware')
const projectRouter = require('./project/router')
const resourceRouter = require('./resource/router')
const taskRouter = require('./task/router')

const express = require('express')

const server = express()

server.use(express.json())

server.use('/api/projects', projectRouter)
// server.use('/api/projects', projectrouter)
server.use('/api/resources', resourceRouter)
server.use('/api/tasks', taskRouter)

server.use('*', (req, res) => {
    res.json({api: 'Server is running'})
})

module.exports = server