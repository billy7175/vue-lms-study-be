const express = require('express')
const router = express.Router()
const { getUsers, login } = require('../../services/user')

router.get('/api', getUsers)
router.post('/api/login', login)


module.exports = router