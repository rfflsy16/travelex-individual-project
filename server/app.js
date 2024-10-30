require('dotenv').config()

const express = require('express')
const router = require('./routers')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use(errorHandler)


module.exports = app