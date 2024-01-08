const User = require('../../schemas/users')
const jwt = require('jsonwebtoken')



async function getUsers(req, res) {

    const Users = await User.aggregate([
        {
            $match : {
                name : 'test'
            }
        },
        { $limit: 1 },
        {
            $lookup: {
                from: "classes",
                localField: 'classTest',
                foreignField: "_id",
                as: "follow"
            }
        },
        
    ])
    console.log(12312312)
    console.log(Users)
    console.log(Users[0])

    res.status(200).send([
        {
            name: '둘리',
            age: '2000',
            email: 'dolly@bingha.com',
            class: 'mw2392',
            auth: 'gold'

        },
        { name: '또치' },
        { name: '도나르드' },
        { name: '인지' }
    ])
}

async function login(req, res) {
    const { email, password } = req.body
    const existingUser = await User.findOne({
        email,
        password
    }).exec()

    if (existingUser) {
        const token = jwt.sign({ email: existingUser.email }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        const user = {
            _id: existingUser._id.valueOf(),
            name: existingUser.name,
            email: existingUser.email,
        }
        return res.json({
            user: user,
            token: token
        })
    }

    return res.status(400).send({
        code: 'IAM001',
        message: 'Please check your account information'
    })

}

module.exports = {
    getUsers,
    login
} 