const express = require('express')
const router = express.Router()
const { getUsers, login } = require('../../services/user')

const middleWaresTest = (req,res) => {
    const cookie = req.cookies
    console.log('#cookie', cookie)
}
router.get('/api', middleWaresTest, getUsers)
router.post('/api/login', login)


module.exports = router