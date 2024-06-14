const { userModel } = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid Email Format" })
        }
        const userNameExist = await userModel.findOne({ username: username })
        if (userNameExist) {
            return res.status(400).json({ message: "Username Already Exist " })
        }
        const emailExist = await userModel.findOne({ email: email })
        if (emailExist) {
            return res.status(400).json({ message: "Email Already Exist " })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            fullName: fullName,
            username: username,
            email: email,
            password: hashedPassword
        })
        if (newUser) {
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "15d" })
            await newUser.save()
             res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImge,
                coverImg: newUser.coverImg
            })
            res.cookie("jwt", token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV !== "development"
            })
            res.json({ message: "Logged In" });
            return
            
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}
const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const findUser = await userModel.findOne({ username: username })
        if (!findUser) {
            return res.status(401).json({ error: "Username doesn't Exist " })
        }
        const comparePassword = await bcrypt.compare(password, findUser.password)
        if (!comparePassword) {
            return res.status(401).json({ error: "Password doesn't Match" })
        }
        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, { expiresIn: "15d" })
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        })
        res.json({ message: "Logged In" });
        return        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}
const logout = async (req, res) => {
    try {
        return res.cookie("jwt", null, {
            expires: new Date(Date.now())
        }).json({ message: "Logged Out" })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}
module.exports = { signup, logout, login }