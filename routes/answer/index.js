const express = require('express')
const router = express.Router();
const { requireSignin } = require('../../middlewares/auth')
const Answer = require('../../schemas/answer')


router.get('/api/answer/:id', requireSignin, async (req, res) => {
    const id = req.params.id
    console.log('#id', id)

    const uesrAnswer = await Answer.findOne({ date: id })
    console.log('#uesrAnswer ------- ')
    if(!uesrAnswer) {
        return res.status(400).send({
            code :'ANSWER_001',
            error : 'No User Answer'
        })
    }

    console.log(uesrAnswer)

    try {
        return res.send(uesrAnswer)
    } catch (error) {
        return res.status(500).send({
            error: 'asd'
        })
    }

})

router.post('/api/answer', requireSignin, async (req, res) => {
    const body = req.body
    console.log("# post ", body)
    try {
        const newItem = await Answer.create(body)
        return res.send(newItem)
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: 'Internal Server Error.'
        })
    }


})

module.exports = router