const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
    ,
    password: {
        type: String,
        required: true,
        minLength: 8
    }
    ,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId
            , ref: "Blog"
            , default: []
        }
    ],
})
const userModel = mongoose.model("User", userSchema)
module.exports = { userModel }