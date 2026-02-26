import React, { useEffect, useState } from "react";
import { fetchStockHistory } from "../../services/api";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const ChartComponent = ({ symbol, token }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchStockHistory(symbol, token);
                setHistory(data.reverse());
            } catch {
                console.log("Error loading chart data");
            }
        };
        load();
    }, [symbol]);

    if (history.length === 0) return <p>Loading chart...</p>;

    return (
        <div className="chart-wrapper">
            <h4>30-Day Price History</h4>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="close" stroke="#4f46e5" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartComponent;
