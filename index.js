// 서버 실행 파일입니다.

const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index.js')
require('dotenv').config()
const connect = require('./schemas/index.js')
app.use(router)
connect()
app.listen(port,() => {
    console.log(`Server is running on ${port}`)
})