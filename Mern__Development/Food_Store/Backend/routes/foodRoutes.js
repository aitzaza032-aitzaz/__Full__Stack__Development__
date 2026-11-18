const express = require("express");
const router = express.Router();
const {
    getFoods,
    getFoodById,
    addFood,
    updateFood,
    deleteFood
} = require("../controllers/foodController");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", getFoods);
router.get("/:id", getFoodById);
router.post("/", auth, admin, addFood);
router.put("/:id", auth, admin, updateFood);
router.delete("/:id", auth, admin, deleteFood);

module.exports = router;