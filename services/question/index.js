const Question = require('../../schemas/questions')


async function getQuestions(req, res) {
    const questions = await Question.find({}).exec()
    return res.json(questions)
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

module.exports = {
    getQuestions,
    createQuestion
} 