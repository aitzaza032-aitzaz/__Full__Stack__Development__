const adminMiddleware = (req , res , next) => {
    if(req.user.role !=="admin") {
        return res.json({
            msg : "Admin access required"
        })
    }
    next();
}
module.exports = adminMiddleware