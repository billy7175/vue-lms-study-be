const express = require('express')
const router = express.Router()
const { getQuestions, createQuestion, createQuestionBoard, getQuestionBoardByDate, getQuestionBoards } = require('../../services/question')

const { requireSignin } = require('../../middlewares/auth')
console.log('#requireSignin', requireSignin)



router.get('/api/questions', getQuestions)
router.get('/api/question-boards', getQuestionBoards)
router.post('/api/question', createQuestion)

router.get('/api/question-board/:id', getQuestionBoardByDate)
router.post('/api/question-board', createQuestionBoard)


module.exports = router