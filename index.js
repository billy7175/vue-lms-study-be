// 서버 실행 파일입니다.

const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index.js')
const connect = require('./schemas/index.js')

connect()
app.use(router)
app.listen(port,() => {
    console.log(`Server is running on ${port}`)
})