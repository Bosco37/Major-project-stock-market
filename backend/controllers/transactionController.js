const Transaction = require("../models/Transaction");
const User = require("../models/User");

const createTransaction = async (req, res) => {
    const { stockSymbol, type, quantity, price } = req.body;
    try {
        const transaction = await Transaction.create({
            user: req.user.id,
            stockSymbol,
            type,
            quantity,
            price,
        });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Failed to create transaction", error: error.message });
    }
};

const getMyTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Failed to get transactions" });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Failed to get transactions" });
    }
};

const updateTransactionStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Failed to update status" });
    }
};

module.exports = {
    createTransaction,
    getMyTransactions,
    getAllTransactions,
    updateTransactionStatus,
};
