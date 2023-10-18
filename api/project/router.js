// build your `/api/projects` router here
const router = require('express').Router()
// const model = require('./model')


router.use((err, req, res,) => {
    res.status(500).json({
        customMessage: 'something went wrong',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
