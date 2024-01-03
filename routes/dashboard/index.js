const express = require('express')
const router = express.Router();
const { getDashboard } = require('../../services/dashboard')
const { requireSignin } = require('../../middlewares/auth')

router.get('/api/dashboard', requireSignin, getDashboard)

module.exports = router