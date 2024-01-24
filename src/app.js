const express = require('express')
const router = require('./router')
const cors = require('cors')
const session = require('express-session')
require('dotenv').config();
const secretKey = process.env.SECRET_KEY

const app = express()

app.use(express.json())
app.use(cors())
app.use(session({
    secret: secretKey,
    resave: false, 
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(router)

module.exports = app;