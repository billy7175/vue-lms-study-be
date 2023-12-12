// 서버 실행 파일입니다.

const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors') // cors
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const port = 3000
require('dotenv').config() // environment file
const router = require('./routes/index.js')
const connect = require('./schemas/index.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) // nodejs post request body params 를 받아요 
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
    methods: ['GET', 'POST']
}))
app.use(router)
connect()
http.createServer(app).listen(port, () => {
    console.log(`Server is running on ${port}`)
})