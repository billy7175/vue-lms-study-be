const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {

    try {
        await mongoose.connect(process.env.dbUrl);
        console.log('@mongoose try')
        // console.log('@mongoose try', mongoose.model('users'))
    } catch (error) {
        console.log('#error', error)
    }

    mongoose.connection.on('connected', () => {
        console.log('connected')
    })

    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결 에러', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
        connect(); // 연결 재시도
    });

}

module.exports = main;
