const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const mongoDb = require("./config/dbConnection");
const dotenv = require("dotenv").config()
mongoDb();
const app = express();
const port = process.env.PORT || 5000
app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)
app.listen(port, () => {
    console.log("server running on ",port)
})


// ePnzTrkNEtWsfvHu this is the passworkd fo rthe mongo
// MONGO_URL=mongodb+srv://harshofficialrawat:ePnzTrkNEtWsfvHu@contactdirectorynodejs.wc0ie.mongodb.net/ContactDirectory?retryWrites=true&w=majority&appName=ContactDirectoryNodeJS
// harshofficialrawat is the username in mongodb
// harsh12345 is the secret tooken in env