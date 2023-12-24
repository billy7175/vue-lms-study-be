const Question = require('../../schemas/questions')


async function getQuestions(req, res) {
    const questions  = await Question.find({}).exec()
    return res.json(questions)
}

module.exports = {
    getQuestions
} 