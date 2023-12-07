const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {

    try {
        await mongoose.connect(process.env.dbUrl);
        console.log('@mongoose try')
        console.log(process.env.dbUrl)
    } catch (error) {
        console.log('#error', error)
    }

    mongoose.connection.on('connected', () => {
        console.log('connected: 몽고디비 연결')
    })

    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결 에러', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    });

}

module.exports = main;
