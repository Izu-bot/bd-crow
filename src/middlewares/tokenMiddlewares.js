require('dotenv').config();
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const authenticateToken = (request, response, next) => {
    if (!token) {
        return response.sendStatus(401)
    }

    jwt.verify(token, secretKey, (err, user) => {
        if(err){
            return response.sendStatus(403)
        }
    })
}

module.exports = authenticateToken