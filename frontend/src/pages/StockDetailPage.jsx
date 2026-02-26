import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchStock, addToWatchlist, createTransaction } from "../services/api";
import ChartComponent from "../components/stocks/ChartComponent";

const StockDetailPage = () => {
    const { symbol } = useParams();
    const { user } = useAuth();
    const [stock, setStock] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadStock = async () => {
            try {
                const data = await fetchStock(symbol, user.token);
                setStock(data);
            } catch (err) {
                setMessage("Could not load stock data.");
            }
        };
        loadStock();
    }, [symbol]);

    const handleAddWatchlist = async () => {
        try {
            await addToWatchlist(symbol, user.token);
            setMessage("Added to watchlist!");
        } catch {
            setMessage("Could not add to watchlist.");
        }
    };

    const handleTrade = async (type) => {
        try {
            await createTransaction(
                { stockSymbol: symbol, type, quantity, price: stock.price },
                user.token
            );
            setMessage(`${type} request submitted!`);
        } catch {
            setMessage("Trade request failed.");
        }
    };

    if (!stock) return <p className="page">Loading stock data...</p>;

    return (
        <div className="page">
            <h2>{symbol} Stock Details</h2>
            <p>Price: ${stock.price}</p>
            <p>High: ${stock.high}</p>
            <p>Low: ${stock.low}</p>
            <p>Change: {stock.changePercent}</p>

            <ChartComponent symbol={symbol} token={user.token} />

            <div className="trade-box">
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button onClick={() => handleTrade("buy")}>Buy</button>
                <button onClick={() => handleTrade("sell")}>Sell</button>
                <button onClick={handleAddWatchlist}>+ Watchlist</button>
            </div>

            {message && <p>{message}</p>}
        </div>
    );
};

export default StockDetailPage;
