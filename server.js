const dns = require("dns");
dns.setServers(["8.8.8.8"]);


const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDb = require("./config/db")
//Db

dotenv.config()


connectDb()

const app =express();

app.use(express.json())
app.use(cors())

app.use("/api/patient", require("./routes/patientRoutes"))

app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/user", require("./routes/authRoutes"))

app.get("/" , (req , res) => {
    res.send("Patient server is running")
})

app.get("/user" , (req , res) => {
    res.send(" information API is running")
})

const PORT = 5000;

app.listen(PORT , ()=>  {
      console.log(`Server Running On Port ${PORT}`);
})
