const mongoose = require("mongoose")

const connectDb = async (req , res) => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDb connected")
        console.log(`MongoDB Connected: ${con.connection.host}`);
    }
    catch(err) {
        console.log(err)
        console.error(`Error: ${err.message}`);
        process.exit(1);
         return res.json({
            msg : "error in databese conecting function"
        })
    }
}
module.exports = connectDb;