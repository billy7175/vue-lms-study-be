const User = require('../../schemas/users');
const Class = require('../../schemas/classes');
const Question = require('../../schemas/questions');

async function getDashboard(req, res) {
    try {
        const users = await User.find({});
        const classes = await Class.find({});
        const questions = await Question.find({});

        const studentCount = users.filter(user => user.role === 'student').length;
        const teacherCount = users.filter(user => user.role === 'teacher').length;
        const classCount = classes.length;
        const questionCount = questions.length;

        const dashboardData = {
            teacherCount,
            studentCount,
            classCount,
            questionCount
        };

        return res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error in getDashboard:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getDashboard
};