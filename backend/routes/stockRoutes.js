const express = require("express");
const router = express.Router();
const { searchStock, getStockHistory } = require("../controllers/stockController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:symbol", protect, searchStock);
router.get("/:symbol/history", protect, getStockHistory);

module.exports = router;
