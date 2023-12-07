const express = require('express')
const router = express.Router()
const { getUsers } = require('../../services/user')

router.get('/', getUsers)


module.exports = router