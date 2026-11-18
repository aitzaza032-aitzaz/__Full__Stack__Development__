const jwt = require("jsonwebtoken");

const authMiddleware = (req , res , next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.json({
            msg : "No token"
        })
    }

    const token = authHeader.split(" ")[1];

    try{
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decode ;
        next();
    }
    catch(err) {
        console.log(err)
        console.log("auth:");
        console.log("error in auth middleare")

        return res.status(401).json({
           msg: "Invalid token"
        });
    }
}
module.exports = authMiddleware;