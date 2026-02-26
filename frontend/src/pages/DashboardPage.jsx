import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getWatchlist } from "../services/api";
import StockCard from "../components/stocks/StockCard";

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [watchlist, setWatchlist] = useState([]);
    const [searchSymbol, setSearchSymbol] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const data = await getWatchlist(user.token);
                setWatchlist(data);
            } catch (err) {
                console.log("Failed to load watchlist");
            } finally {
                setLoading(false);
            }
        };
        fetchWatchlist();
    }, []);

    const handleSearch = () => {
        if (searchSymbol) {
            navigate(`/stock/${searchSymbol}`);
        }
    };

    return (
        <div className="page">
            <h2>Welcome, {user?.name}</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search stock symbol (e.g. AAPL)"
                    value={searchSymbol}
                    onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch} disabled={!searchSymbol}>Search</button>
            </div>

            <h3>Your Watchlist</h3>
            {loading ? (
                <p>Loading...</p>
            ) : watchlist.length === 0 ? (
                <p>No stocks in your watchlist yet.</p>
            ) : (
                <div className="stock-grid">
                    {watchlist.map((symbol) => (
                        <StockCard key={symbol} symbol={symbol} token={user.token} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
