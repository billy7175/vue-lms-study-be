const User = require('../../schemas/users')



async function getUsers(req, res) {
    res.send([
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

async function login (req ,res){
    const { email, password } = req.body
    console.log('Clinet Body Data', req.body)
    const existingUser = await User.findOne({
        email,
        password
    }).exec()


    console.log('#existingUser', existingUser)

    if(existingUser) return res.status(200).send({
        ok: true
    })

    return res.status(400).send({
        code: 'IAM001',
        message: 'Please check your account information'
    })

}

module.exports = {
    getUsers,
    login
} 