const express = require("express");
const router = express.Router();

const {
    checkAdmin,
    signup,
    login
} = require("../controller/authController");


router.get("/check-admin", checkAdmin);

router.post("/signup", signup);

router.post("/login", login);


module.exports = router;