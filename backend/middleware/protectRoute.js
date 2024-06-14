const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        if (!verify) {
            return res.status(401).json({ error: "Token Invalid Login!" })
        }
        const verifiedUser = await userModel.findById(verify.id).select("-password")
        if (!verifiedUser) {
            return res.status(401).json({ error: "Unathorized" })
        }
        req.user = verifiedUser
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error While Verifying Token" })
    }
}
module.exports = {protectRoute}