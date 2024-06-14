const app = require("./app");
const { connectToDb } = require("./db/connection");
const port = process.env.port || 5000
app.listen(port, () => {
    connectToDb()
    console.log('Serving on port', port);
})