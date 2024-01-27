const express = require('express')
const router = express.Router()
const { getUsers, login } = require('../../services/user')
const { requireSignin } = require('../../middlewares/auth')
console.log('#requireSignin', requireSignin)

router.get('/api/users', requireSignin, getUsers)
router.post('/api/login', login)


module.exports = router