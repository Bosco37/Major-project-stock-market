const axios = require("axios");

const searchStock = async (req, res) => {
    const { symbol } = req.params;
    try {
        const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === "error") {
            return res.status(404).json({ message: "Stock not found" });
        }

        res.json({
            symbol: data.symbol,
            price: data.close,
            high: data.high,
            low: data.low,
            change: data.change,
            changePercent: data.percent_change,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch stock data", error: error.message });
    }
};

const getStockHistory = async (req, res) => {
    const { symbol } = req.params;
    try {
        const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=30&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === "error" || !data.values) {
            return res.status(404).json({ message: "History not found" });
        }

        const history = data.values.map((entry) => ({
            date: entry.datetime,
            close: entry.close,
        }));

        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch history", error: error.message });
    }
};

module.exports = { searchStock, getStockHistory };
