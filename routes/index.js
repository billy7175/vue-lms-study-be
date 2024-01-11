const express = require('express')
const router = express.Router()
const userRouter = require('./user/index.js')
const questionRouter = require('./question/index.js')
const dashboardRouter = require('./dashboard/index.js')
const vocabularySheetRouter = require('./vocabularySheet/index.js')


router.use(userRouter)
router.use(questionRouter)
router.use(dashboardRouter)
router.use(vocabularySheetRouter)

module.exports = router;