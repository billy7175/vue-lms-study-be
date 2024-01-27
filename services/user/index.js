const User = require('../../schemas/users')
const jwt = require('jsonwebtoken')

async function getUsers(req, res) {
    console.log('#getUsers')
    try {
        const Users = await User.aggregate([
            // {
            //     // $match : {
            //     //     name : 'test'
            //     // }
            // },
            // { $limit: 1 },
            {
                $lookup: {
                    from: "classes",
                    localField: 'classTest',
                    foreignField: "_id",
                    as: "class"
                }
            },
            {
                $addFields : {
                    class:  { $arrayElemAt: ["$class", 0] }  // Take the first element if the array is not empty
                }
            }
            
        ])
    
        res.status(200).send(Users)
    } catch(error){
        console.log(error)
    }
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
            role: existingUser.role
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