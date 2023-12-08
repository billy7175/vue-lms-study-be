// 서버 실행 파일입니다.

const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors') // cors
const bodyParser = require('body-parser')
const port = 3000
const router = require('./routes/index.js')
require('dotenv').config() // environment file
const connect = require('./schemas/index.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) // nodejs post request body params 를 받아요 
app.use(cors())
app.use(router)
connect()
http.createServer(app).listen(port, () => {
    console.log(`Server is running on ${port}`)
})