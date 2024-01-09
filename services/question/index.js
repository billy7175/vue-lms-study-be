const Question = require('../../schemas/questions')
const QuestionBoard = require('../../schemas/questionBoards')


async function getQuestions(req, res) {
    const questions = await Question.find({}).exec()
    return res.json(questions)
}

async function getQuestionBoards (req, res) {
    const questionBoards = await QuestionBoard.find({}).exec()
    return res.json(questionBoards)
}

async function createQuestion(req, res) {
    try {
        const requestBody = req.body
        const newQuestion = await Question.create(requestBody)
        // const id = newQuestion._id
        return res.json(newQuestion)
    } catch (error) {
        console.log('#error', error)
        return res.status(400).send({
            code: 'Q001',
            message: 'Please contact the administrator'
        })
    }
}

async function createQuestionBoard  (req, res){
    try {
        const requestBody = req.body
        const newItem = await QuestionBoard.create(requestBody)
        return res.json(newItem)
    } catch(error){
        console.log('#Error: createQuestionBoard', error)
        return res.status(400).send({
            code: 'QB001',
            ...error
        })
    }
}

async function getQuestionBoardByDate() {
    return true
}

module.exports = {
    getQuestions,
    getQuestionBoards,
    createQuestion,
    createQuestionBoard,
    getQuestionBoardByDate
} 