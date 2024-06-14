const { blogModel } = require("../model/blog.model")
const { userModel } = require("../model/user.model")

const writeBlog = async (req, res) => {
    try {
        let { title, content } = req.body
        if (!title || !content) {
            return res.status(400).status({ error: "Please Fill the fields Properly" })
        }
        let newBlog = await blogModel.create({
            title: title,
            content: content,
            author: req.user._id
        })
        await userModel.findOneAndUpdate(
            { _id: req.user._id.toString() },
            { $addToSet: { blogs: newBlog._id } },
            { new: true }
        );

        return res.status(200).json({ message: "New Blog Created ", id: newBlog._id })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}
const getBulk = async (req, res) => {
    try {
        const blogs = await blogModel.find().populate({ select: "username", path: "author" })
        return res.status(200).json({ blogs })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" })

    }
}
const deleteBlog = async (req, res) => {
    try {
        let { id } = req.params
        let findBlog = await blogModel.findOne({ _id: id, author: req.user._id })
        if (!findBlog) {
            return res.status(400).json({ error: "Blog Not Found" })
        }
        if (!findBlog.author.toString() == req.user._id.toString()) {
            return res.status(401).json({ error: "You are not the author" })
        }
        let deletedBlog = await findBlog.deleteOne()
         await userModel.updateOne(
            { _id: userId },
            { $pull: { blogs: blogIdToDelete } }
        );
        return res.status(200).json({ deletedBlog, meesage: "Blog Deleted" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


const editBlog = async (req, res) => {
    try {
        let { id } = req.params
        let { title, content } = req.body
        let findBlog = await blogModel.findOne({ _id: id, author: req.user._id })
        if (!findBlog) {
            return res.status(400).json({ error: "Blog Not Found" })
        }
        if (!findBlog.author.toString() == req.user._id.toString()) {
            return res.status(401).json({ error: "You are not the author" })
        }
        findBlog.title = title || findBlog.title
        findBlog.content = content || findBlog.content
        await findBlog.save()
        let newBlog = await blogModel.findOne({ _id: id })
        return res.status(200).json({ message: "Blog Edited Successfully", newBlog })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}
module.exports = { writeBlog, getBulk, editBlog, deleteBlog }