const  getUser = require("../controller/userController")

const auth = require("../middleware/authMiddleware")
const admin = require("../middleware/adminMiddleware")

const express = require("express")
const router = express.Router();

router.get("/" , auth  , admin  ,getUser)

module.exports = router;