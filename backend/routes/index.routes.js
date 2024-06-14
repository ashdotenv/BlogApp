const express = require('express');
const {authRouter} = require('./auth.routes');
const {blogRouter} = require('./blog.routes');
const router = express.Router()
router.use('/auth',authRouter)
router.use('/blog',blogRouter)
module.exports={router}