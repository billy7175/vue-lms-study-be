const express = require('express')
const router = express.Router()
const userRouter = require('./user/index.js')


router.use('/api', userRouter)

module.exports = router;