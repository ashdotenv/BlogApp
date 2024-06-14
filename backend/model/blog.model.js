const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
})
const blogModel = new mongoose.model("Blog", blogSchema)
module.exports = { blogModel }