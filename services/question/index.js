const Question = require('../../schemas/questions')
const QuestionBoard = require('../../schemas/questionBoards')
const dayjs = require('dayjs')


async function getQuestions(req, res) {
    const questions = await Question.find({}).exec()
    return res.json(questions)
}

async function getQuestionByDate(req, res) {
    try {
        const paramId = req.params.id;
        console.log('#paramId', paramId);

        const questions = await Question.find({}).exec();
        const formattedParamId = dayjs(paramId).format('YYYY-MM-DD');
        const filteredQuestions = questions.filter(question => {
            const formattedQuestionDate = dayjs(question.scheduledDate).format('YYYY-MM-DD');
            return formattedQuestionDate === formattedParamId;
        });
        return res.json(filteredQuestions);
    } catch (error) {
        console.error('Error fetching questions by date:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getQuestionBoards(req, res) {
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

async function createQuestionBoard(req, res) {
    try {
        const requestBody = req.body
        const newItem = await QuestionBoard.create(requestBody)
        return res.json(newItem)
    } catch (error) {
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
    getQuestionByDate,
    getQuestions,
    getQuestionBoards,
    createQuestion,
    createQuestionBoard,
    getQuestionBoardByDate
} 