const express = require('express')
const router = express.Router()
const { getQuestionByDate, getQuestions, createQuestion, createQuestionBoard, getQuestionBoardByDate, deleteQuestionById, getQuestionBoards } = require('../../services/question')

const { requireSignin } = require('../../middlewares/auth')
console.log('#requireSignin', requireSignin)


router.get('/api/questions', getQuestions)
router.get(`/api/questions/:id`, getQuestionByDate)
router.post('/api/question', createQuestion)
router.delete('/api/question/:id', deleteQuestionById)


router.get('/api/question-boards', getQuestionBoards)
router.get('/api/question-board/:id', getQuestionBoardByDate)
router.post('/api/question-board', createQuestionBoard)


module.exports = router