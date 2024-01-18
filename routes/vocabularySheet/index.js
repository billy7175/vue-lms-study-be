const express = require('express')
const router = express.Router()
const { getVocabularyById, getVocabularySheets, createVocabularySheet, updateVocabularySheet  } = require('../../services/vocabualrySheet')
const { requireSignin } = require('../../middlewares/auth')


router.get('/api/vocabulary-sheets', requireSignin, getVocabularySheets)
router.get('/api/vocabulary-sheets/:id', requireSignin, getVocabularyById)
router.post('/api/vocabulary-sheet', requireSignin, createVocabularySheet)
router.put('/api/vocabulary-sheet/:id', requireSignin, updateVocabularySheet)


module.exports = router