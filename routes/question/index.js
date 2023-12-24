const express = require('express')
const router = express.Router()
const { getQuestions } = require('../../services/question')

const { requireSignin } = require('../../middlewares/auth')
console.log('#requireSignin', requireSignin)



router.get('/api/questions', getQuestions)


module.exports = router