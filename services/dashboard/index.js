const User = require('../../schemas/users') 
const Class = require('../../schemas/classes')
const Question = require('../../schemas/questions')

async function getDashboard(req, res){
    const users = await User.find({}).exec()
    const classes = await Class.find({}).exec()
    const questions = await Question.find({}).exec()
    const studentCount = users.filter(user => user.role === 'student').length
    const teacherCount = users.filter(user => user.role === 'teacher').length
    const classCount = classes.length
    const questionCount = questions.length

    return res.send(
        {
            teacherCount : teacherCount, 
            studentCount : studentCount,
            classCount : classCount,
            questionCount : questionCount
        }
    )
}

module.exports = {
    getDashboard : getDashboard
} 