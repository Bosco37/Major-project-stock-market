const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
    res.send("Stock Market Dashboard API is running!");
});

const PORT = process.env.PORT || 5000;

// Start server immediately regardless of DB state
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB with auto-retry
const connectWithRetry = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("✅ Connected to MongoDB");
        })
        .catch((err) => {
            console.log("❌ MongoDB connection failed:", err.message);
            console.log("🔄 Retrying in 5 seconds...");
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();
