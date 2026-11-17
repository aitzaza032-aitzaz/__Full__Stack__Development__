const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
    getProfile,
    updateProfile,
    getAllUsers,
    checkAdminExists  
} = require("../controllers/userController");

router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.get("/all", auth, admin, getAllUsers);
router.get("/check-admin", checkAdminExists);  

module.exports = router;