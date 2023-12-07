const User = require('../../schemas/users')

async function checkUser (){
    const foundUser = await User.findOne({ age: 26}).exec()    
    console.log('#foundUser', foundUser)
}

checkUser()

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

module.exports = {
    getUsers
} 