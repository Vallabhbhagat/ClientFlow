import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Page from "../layout/Page";
import GlassCard from "../components/ui/GlassCard";
import AnimatedButton from "../components/ui/AnimatedButton";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import EmptyStateIllustration from "../components/ui/EmptyStateIllustration";
import {
    deleteClient,
    listClients,
    searchClientsByName,
} from "../services/clientService";
import { logoutAdmin } from "../services/authService";

const ClientsPage = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [clients, setClients] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

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
        try {
            setLoading(true);
            const data = await listClients();
            const arr = Array.isArray(data?.data) ? data.data : [];
            setClients(arr);
            setTotal(arr.length);
        } catch (e) {
            // Keep user on page and just surface the problem
            toast.error(e.message || "Failed to load clients.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const data = await searchClientsByName(search);
            setClients(Array.isArray(data?.data) ? data.data : []);
        } catch (e) {
            toast.error(e.message || "Search failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (ClientId) => {
        try {
            await deleteClient(ClientId);
            toast.success("Client deleted");
            fetchClients();
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Delete failed");
        }
    };

    return (
        <Page>
                <div className="page-head">
                    <div>
                        <div className="page-kicker">Directory</div>
                        <h1 className="page-title">Clients</h1>
                        <div className="page-sub">Manage and search client records.</div>
                    </div>
                    <div className="page-actions">
                        <div className="field">
                            <div className="label">Search</div>
                            <input
                                className="input"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name..."
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-2">
                    <GlassCard className="stat-card">
                        <div className="stat-label">Total clients</div>
                        <div className="stat-value">{total}</div>
                    </GlassCard>
                    <GlassCard className="stat-card">
                        <div className="stat-label">Results</div>
                        <div className="stat-value">{clients.length}</div>
                    </GlassCard>
                </div>

                <div style={{ height: 16 }} />

                <GlassCard className="table-card">
                    {loading ? (
                        <LoadingSkeleton lines={6} />
                    ) : clients.length === 0 ? (
                        <EmptyStateIllustration
                            title="No clients found"
                            subtitle="Try a different query, or add clients from the Dashboard."
                        />
                    ) : (
                        <div className="table">
                            <div className="table-head">
                                <div>Name</div>
                                <div>Email</div>
                                <div style={{ textAlign: "right" }}>Actions</div>
                            </div>
                            {clients.map((c) => (
                                <div key={c._id} className="table-row">
                                    <div className="strong">{c.name}</div>
                                    <div className="muted">{c.email}</div>
                                    <div style={{ textAlign: "right" }}>
                                        <AnimatedButton
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(c._id)}
                                        >
                                            Delete
                                        </AnimatedButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </GlassCard>
            </Page>
    );
};

export default ClientsPage;
