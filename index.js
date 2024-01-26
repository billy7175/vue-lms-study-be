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
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(router)
connect()

const socketio = require("socket.io")
const server = http.createServer(app)
const io = socketio(server)
const { addUser, removeUser } = require('./utils/users.js')

let count = 0
let logginedInUser = []
io.on('connection', (socket) => {

    count = count + 1
    logginedInUser.push(Math.random())

    // Example: handle incoming messages from the client
    socket.on('message', (data) => {
        console.log('Received message:', data.message);
    });

    socket.on('connect', () => {
        console.log('socket.on connected method')
    })

    socket.on('close', () => {
        console.log('sa yo n a ra')
    })

    socket.on('join', (option, callback) => {
        const { error, user } = addUser({ id: socket.id, ...option })
        if (error) {
            return console.log(error)
        }

        socket.emit('message', `${user.name}이 로그인중입니다.`)
    })

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        console.log('#socjasdas', user)
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});