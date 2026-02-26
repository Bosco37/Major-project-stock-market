import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllTransactions, updateStatus } from "../services/api";
import TransactionTable from "../components/trading/TransactionTable";

const AdminPanelPage = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getAllTransactions(user.token);
                setTransactions(data);
            } catch {
                console.log("Error loading admin transactions");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            await updateStatus(id, status, user.token);
            setTransactions((prev) =>
                prev.map((t) => (t._id === id ? { ...t, status } : t))
            );
        } catch {
            console.log("Status update failed");
        }
    };

    return (
        <div className="page">
            <h2>Admin Panel — All Transactions</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <TransactionTable
                    transactions={transactions}
                    isAdmin={true}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
};

export default AdminPanelPage;
