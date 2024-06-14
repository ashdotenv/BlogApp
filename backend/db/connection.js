const mongoose = require('mongoose');
const connectToDb = async () => {
    try {
        const con = await mongoose.connect(process.env.DB_URI)
        console.log("Connected to", con.connection.host);
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}
module.exports = { connectToDb }