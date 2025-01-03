const mongoose = require("mongoose")
const mongoDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("connected", connect.connection.host,connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
module.exports=mongoDb