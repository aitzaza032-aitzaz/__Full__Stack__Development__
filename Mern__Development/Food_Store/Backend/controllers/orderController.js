const Order = require("../models/Order");
const Food = require("../models/Food");

const placeOrder = async (req, res) => {
    try {
        const { foodId, quantity } = req.body;

        if (!foodId || !quantity) {
            return res.status(400).json({ message: "Food ID and quantity are required" });
        }

        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: "Food Not Found" });
        }

        const totalPrice = food.price * quantity;

        const order = await Order.create({
            user: req.user.id,
            food: food._id,
            quantity,
            totalPrice
        });

        const populatedOrder = await Order.findById(order._id).populate("food");
        res.status(201).json(populatedOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("food")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("food")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate("food");
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};