const { userModel } = require("../model/user.model")

const getBulkUsers = async (req, res) => {
    try {
        let bulkUsers = await userModel.find()
        return res.status(200).json(bulkUsers)
    } catch (error) {
        console.log(error.message);
        return res.stauts(500).json({ message: "Internal Server Error" })
    }
}
const updateUser = async (req, res) => {
    try {
        let { firstName, email, username, password } = req.body
        let { id } = req.params
        if(!id){
            return res.status(401).json({ error: "Provide User Id" })
        }
        if (!(id == req.user._id.toString())) {
            return res.status(401).json({ error: "You are not allowed to modify this User" })
        }
        let user = await userModel.findById(id)
        if (!user) {
            return res.status(400).json({ error: "User doesn't exist " })
        }
        user.firstName = firstName || user.firstName
        user.email = email || user.email
        user.username = username || user.username
        user.password = password || user.password
        let updated = await user.save()
        updated.password=null
        return res.status(200).json({ message: "User Updated",updated:updated })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = { getBulkUsers, updateUser }