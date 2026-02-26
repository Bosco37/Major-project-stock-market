const User = require("../models/User");

const addToWatchlist = async (req, res) => {
    const { symbol } = req.body;
    try {
        const user = await User.findById(req.user.id);

        if (user.watchlist.includes(symbol.toUpperCase())) {
            return res.status(400).json({ message: "Stock already in watchlist" });
        }

        user.watchlist.push(symbol.toUpperCase());
        await user.save();

        res.json({ message: "Added to watchlist", watchlist: user.watchlist });
    } catch (error) {
        res.status(500).json({ message: "Failed to add to watchlist" });
    }
};

const removeFromWatchlist = async (req, res) => {
    const { symbol } = req.params;
    try {
        const user = await User.findById(req.user.id);
        user.watchlist = user.watchlist.filter((s) => s !== symbol.toUpperCase());
        await user.save();

        res.json({ message: "Removed from watchlist", watchlist: user.watchlist });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove from watchlist" });
    }
};

const getWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("watchlist");
        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ message: "Failed to get watchlist" });
    }
};

module.exports = { addToWatchlist, removeFromWatchlist, getWatchlist };
