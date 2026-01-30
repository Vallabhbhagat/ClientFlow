import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Client.css"

const ClientsPage = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [clients, setClients] = useState([]);
    const [total, setTotal] = useState(0);

    const handleHome = () => {
        navigate("/admin-dashboard");
    }

    // ================= FETCH HELPER =================
    const fetchWithAuth = async (url, options = {}) => {
        const res = await fetch(url, {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            ...options,
        });

        if (!res.ok) {
            navigate("/");
            return null;
        }

        return await res.json();
    };

    // ================= INITIAL LOAD =================
    useEffect(() => {
        fetchClients();
    }, []);

    useEffect(() => {
        if (search.trim()) handleSearch();
        else fetchClients();
    }, [search]);

    // ================= FETCH FUNCTIONS =================
    const fetchClients = async () => {
        const data = await fetchWithAuth("http://localhost:5000/api/client");
        if (data) {
            setClients(Array.isArray(data.data) ? data.data : []);
            setTotal(Array.isArray(data.data) ? data.data.length : 0);
        }
    };

    const handleSearch = async () => {
        const data = await fetchWithAuth(
            `http://localhost:5000/api/client/search?name=${search}`
        );
        if (data) setClients(Array.isArray(data.data) ? data.data : []);
    };

    const handleDelete = async (ClientId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/client/${ClientId}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) fetchClients();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="clients-container">
            <div className="clients-card">
                {/* Header */}
                <div className="clients-header">
                    <div className="nav-left">
                        <h3>ClientFlow</h3>
                    </div>

                    <div className="nav-right">
                        <button className="btn-home" onClick={handleHome}>
                            Home
                        </button>
                    </div>

                    <div className="clients-controls">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search client..."
                            className="search-input"
                        />

                        <p className="clients-total">
                            Total Clients: <strong>{total}</strong>
                        </p>
                    </div>
                </div>

                {/* List */}
                <ul className="clients-list">
                    {clients.map((c) => (
                        <li key={c._id} className="client-item">
                            <div className="client-info">
                                <span className="client-name">{c.name}</span>
                                <span className="client-email">{c.email}</span>
                            </div>

                            <button
                                className="btn-delete"
                                onClick={() => handleDelete(c._id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>


    );
};

export default ClientsPage;
