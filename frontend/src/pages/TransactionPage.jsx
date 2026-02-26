import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyTransactions } from "../services/api";
import TransactionTable from "../components/trading/TransactionTable";

const TransactionPage = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getMyTransactions(user.token);
                setTransactions(data);
            } catch {
                console.log("Error loading transactions");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div className="page">
            <h2>My Transactions</h2>
            {loading ? <p>Loading...</p> : <TransactionTable transactions={transactions} />}
        </div>
    );
};

export default TransactionPage;
