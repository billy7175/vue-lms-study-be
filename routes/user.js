// 서버 실행 파일입니다.

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('요리보고 조리복')
    res.send({
        message:'요리장보고 조리장보고'
    })
})


module.exports = router