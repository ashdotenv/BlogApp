require("dotenv").config()
const express = require('express');
const cors = require('cors');
const { router } = require('./routes/index.routes');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000"],
    })
); app.use(cookieParser())
app.use("/api/v1", router)
module.exports = app