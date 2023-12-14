const { expressjwt } = require("express-jwt");

// 1. invalid signature *토큰 정보가 다른 경우
// 2. No authorization token was found // token 이 없는 경우

const requireSignin = expressjwt({
    getToken: (req, res) => {
        // console.log('#Authorization', req.headers.Authorization) // sent with Capital...
        // return req.cookies.token
        console.log('#authorization', req.headers.authorization) // recognized as Lower ??? 
        return req.headers.authorization
    },
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
})

module.exports = {
    requireSignin
}