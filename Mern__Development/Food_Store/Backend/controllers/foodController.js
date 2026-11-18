const Food = require("../models/Food");

const getFoods = async (req, res) => {
    try {
        const foods = await Food.find().sort({ createdAt: -1 });
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }
        res.json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addFood = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;
        
        if (!name || !description || !price || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const food = await Food.create(req.body);
        res.status(201).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }
        res.json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }
        res.json({ message: "Food Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFoods,
    getFoodById,
    addFood,
    updateFood,
    deleteFood
};