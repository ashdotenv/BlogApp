const express = require('express');
const { getBulk, editBlog, deleteBlog, writeBlog } = require('../controller/blog.contoller');
const { protectRoute } = require('../middleware/protectRoute');
const blogRouter = express.Router()
blogRouter.post("/", protectRoute, writeBlog)
blogRouter.get("/bulk", protectRoute, getBulk)
blogRouter.patch("/edit/:id", protectRoute, editBlog)
blogRouter.delete("/delete/:id", protectRoute, deleteBlog)
module.exports = { blogRouter }