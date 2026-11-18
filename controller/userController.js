const User = require("../models/user")

const getUser = async (req , res) => {
    try{
        const user = await User.find().select("-password");
        res.json(user)
    }
    catch(err) {
        console.log(err)
        return res.json({
            msg : "error in geting user"
        })
    }
}
module.exports = getUser;