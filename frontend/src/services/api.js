import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const authHeader = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
});

export const registerUser = async (name, email, password) => {
    const res = await axios.post(`${BASE_URL}/auth/register`, { name, email, password });
    return res.data;
};

export const loginUser = async (email, password) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return res.data;
};

export const fetchStock = async (symbol, token) => {
    const res = await axios.get(`${BASE_URL}/stocks/${symbol}`, authHeader(token));
    return res.data;
};

export const fetchStockHistory = async (symbol, token) => {
    const res = await axios.get(`${BASE_URL}/stocks/${symbol}/history`, authHeader(token));
    return res.data;
};

export const getWatchlist = async (token) => {
    const res = await axios.get(`${BASE_URL}/watchlist`, authHeader(token));
    return res.data;
};

export const addToWatchlist = async (symbol, token) => {
    const res = await axios.post(`${BASE_URL}/watchlist`, { symbol }, authHeader(token));
    return res.data;
};

export const removeFromWatchlist = async (symbol, token) => {
    const res = await axios.delete(`${BASE_URL}/watchlist/${symbol}`, authHeader(token));
    return res.data;
};

export const createTransaction = async (payload, token) => {
    const res = await axios.post(`${BASE_URL}/transactions`, payload, authHeader(token));
    return res.data;
};

export const getMyTransactions = async (token) => {
    const res = await axios.get(`${BASE_URL}/transactions/my`, authHeader(token));
    return res.data;
};

export const getAllTransactions = async (token) => {
    const res = await axios.get(`${BASE_URL}/transactions/all`, authHeader(token));
    return res.data;
};

export const updateStatus = async (id, status, token) => {
    const res = await axios.put(
        `${BASE_URL}/transactions/${id}/status`,
        { status },
        authHeader(token)
    );
    return res.data;
};
