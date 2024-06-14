const express = require('express');
const { getBulkUsers, updateUser } = require('../controller/users.controller');
const { protectRoute } = require('../middleware/protectRoute');
const userRouter = express.Router()
userRouter.get("/bulk",protectRoute,getBulkUsers)
userRouter.patch("/updateUser/:id",protectRoute,updateUser)
module.exports=userRouter