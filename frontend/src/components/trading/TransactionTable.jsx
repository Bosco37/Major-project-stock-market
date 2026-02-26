import React from "react";

const TransactionTable = ({ transactions, isAdmin, onStatusChange }) => {
    if (transactions.length === 0) {
        return <p>No transactions found.</p>;
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    {isAdmin && <th>User</th>}
                    <th>Stock</th>
                    <th>Type</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Status</th>
                    {isAdmin && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {transactions.map((t) => (
                    <tr key={t._id}>
                        {isAdmin && <td>{t.user?.name || t.user?.email}</td>}
                        <td>{t.stockSymbol}</td>
                        <td>{t.type}</td>
                        <td>{t.quantity}</td>
                        <td>${t.price}</td>
                        <td>{t.status}</td>
                        {isAdmin && t.status === "pending" && (
                            <td>
                                <button onClick={() => onStatusChange(t._id, "approved")}>Approve</button>
                                <button onClick={() => onStatusChange(t._id, "rejected")}>Reject</button>
                            </td>
                        )}
                        {isAdmin && t.status !== "pending" && <td>—</td>}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionTable;
