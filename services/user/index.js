const User = require('../../schemas/users')
const jwt = require('jsonwebtoken')



async function getUsers(req, res) {
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
    console.log('Clinet Body Data', req.body)
    const existingUser = await User.findOne({
        email,
        password
    }).exec()



    if (existingUser) {
        console.log('#user', existingUser)
        console.log('#user_id', existingUser._id)
        console.log('#user_id', existingUser._id.valueOf())

        const token = jwt.sign({ email: existingUser.email }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        console.log('#token', token)
        res.cookie("token", token, {
            httpOnly: true,

        })
        const user = {
            _id: existingUser._id.valueOf(),
            name: existingUser.name,
            email: existingUser.email,
        }
        console.log('#existingUser', existingUser)

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