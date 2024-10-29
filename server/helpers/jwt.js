const jwt = require('jsonwebtoken')
const privateKey = process.env.SECRET_KEY

const signToken = (payload) => {
    return jwt.sign(payload, privateKey)
}

const verifyToken = (token) => {
    return jwt.verify(token, privateKey)
}

module.exports = { signToken, verifyToken }