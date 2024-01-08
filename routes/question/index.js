const express = require('express')
const router = express.Router()
const { getQuestions, createQuestion } = require('../../services/question')

const { requireSignin } = require('../../middlewares/auth')
console.log('#requireSignin', requireSignin)



router.get('/api/questions', getQuestions)
router.post('/api/question', createQuestion)


module.exports = router