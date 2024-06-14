require("dotenv").config()
const express = require('express');
const { router } = require('./routes/index.routes');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(router)
module.exports = app