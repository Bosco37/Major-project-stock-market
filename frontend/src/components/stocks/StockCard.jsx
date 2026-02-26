import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStock } from "../../services/api";

const StockCard = ({ symbol, token }) => {
    const [stock, setStock] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchStock(symbol, token);
                setStock(data);
            } catch {
                console.log("Failed to load stock:", symbol);
            }
        };
        load();
    }, [symbol]);

    if (!stock) return <div className="stock-card">Loading {symbol}...</div>;

    return (
        <div className="stock-card" onClick={() => navigate(`/stock/${symbol}`)}>
            <h3>{symbol}</h3>
            <p>${stock.price}</p>
            <p className={parseFloat(stock.change) >= 0 ? "green" : "red"}>
                {stock.changePercent}
            </p>
        </div>
    );
};

export default StockCard;
