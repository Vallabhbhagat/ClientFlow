import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientsPage = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [clients, setClients] = useState([]);
    const [total, setTotal] = useState(0);

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

    return (
        <div>
            <h1>Clients</h1>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search client..."
            />
            <p>Total Clients: {total}</p>
            <ul>
                {clients.map((c) => (
                    <li key={c._id}>
                        {c.name} — {c.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientsPage;
