const express = require('express')
const router = express.Router()
const { getVocabularySheets, createVocabularySheet  } = require('../../services/vocabualrySheet')
const { requireSignin } = require('../../middlewares/auth')


router.get('/api/vocabulary-sheets', requireSignin, getVocabularySheets)
router.post('/api/vocabulary-sheet', requireSignin, createVocabularySheet)


module.exports = router