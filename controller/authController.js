const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const checkAdmin = async (req, res) => {
    try {
        const adminexist = await User.findOne({ role: "admin" });

        if (adminexist) {
            return res.json(true);
        }

        return res.json(false);
    }
    catch(err) {
        console.log(err);

        return res.status(500).json({
            msg: "Error in checking admin"
        });
    }
}


const signup = async (req , res) => {
    try{
        const {name ,email , password ,role} = req.body;

        const userexist = await User.findOne({email}) ;

        if(userexist) {
            return res.json({
                msg : " User already exist"
            });
        }

        if(role === "admin") {
           const adminexist = await User.findOne({ role: "admin" });

            if(adminexist) {
            return res.json({
                msg : "Admin already exists"
            });
        } }

        const hashedPassword = await bcrypt.hash(password  ,10);

            

        const  user = await User.create({
            name ,
            email ,
            password : hashedPassword ,
            role: role === "admin" ? "admin" : "user"
        })

        res.status(201).json({
            msg : "Signup successfull"
        });

     }
    catch(err) {
        console.log("Signup error:", err);
        res.status(500).json({
            message: err.message
        });
    }
}

const login = async (req , res) => {
    try{
        const {email , password} = req.body ;

       const userexist = await User.findOne({ email });

        if(!userexist) {
            return res.json({
                msg : "User not exists"
            });
        }

        const isMatch = await bcrypt.compare(password , userexist.password);

        if(!isMatch) {
            return res.json({
                msg : "Invalid credentials"
            });
        }

         const token = jwt.sign(
            {
                id: userexist._id,
                role: userexist.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(201).json({
            msg: "lOged in",
            token,
        user: {
            role: userexist.role
        }

});

    }
    catch(err) {
        console.log("Login error:", err);
        res.status(500).json({
            message: err.message
        });
    }
}
module.exports = {
    checkAdmin,
    signup,
    login
};