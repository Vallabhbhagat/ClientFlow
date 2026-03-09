import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Page from "../layout/Page";
import GlassCard from "../components/ui/GlassCard";
import AnimatedButton from "../components/ui/AnimatedButton";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import EmptyStateIllustration from "../components/ui/EmptyStateIllustration";
import { addTeamMember, deleteTeamMember, listTeam } from "../services/teamService";

export default function TeamPage() {
  const navigate = useNavigate();

  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const data = await listTeam();
      setTeam(Array.isArray(data?.data) ? data.data : []);
    } catch (e) {
      toast.error(e.message || "Unauthorized. Please login.");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addTeamMember({
        name,
        email,
        password,
        hourlyRate: parseFloat(hourlyRate) || 0,
      });
      setName("");
      setEmail("");
      setPassword("");
      setHourlyRate("");
      toast.success("Member added");
      fetchTeam();
    } catch (e2) {
      toast.error(e2.message || "Failed to add member");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeamMember(id);
      toast.success("Member removed");
      fetchTeam();
    } catch (e) {
      toast.error(e.message || "Delete failed");
    }
  };

  return (
    <Page>
        <div className="page-head">
          <div>
            <div className="page-kicker">People</div>
            <h1 className="page-title">Team members</h1>
            <div className="page-sub">Manage members and hourly rates used for insights.</div>
          </div>
        </div>

        <div className="grid grid-2">
          <GlassCard className="form-card">
            <div className="strong" style={{ padding: "10px 10px 14px" }}>
              Add member
            </div>
            <form className="form-grid" onSubmit={handleAdd}>
              <div className="field">
                <div className="label">Name</div>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="field">
                <div className="label">Email</div>
                <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="field">
                <div className="label">Password</div>
                <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="field">
                <div className="label">Hourly rate</div>
                <input className="input" type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
              </div>
              <div className="form-actions">
                <AnimatedButton variant="primary" type="submit">
                  Add member
                </AnimatedButton>
              </div>
            </form>
          </GlassCard>

          <GlassCard className="table-card">
            <div className="strong" style={{ padding: "10px 10px 14px" }}>
              Members
            </div>
            {loading ? (
              <LoadingSkeleton lines={8} />
            ) : team.length === 0 ? (
              <EmptyStateIllustration title="No team members" subtitle="Add your first member to start assigning tasks." />
            ) : (
              <div className="table">
                <div className="table-head">
                  <div>Name</div>
                  <div>Email</div>
                  <div style={{ textAlign: "right" }}>Actions</div>
                </div>
                {team.map((m) => (
                  <div key={m._id} className="table-row">
                    <div className="strong">{m.name}</div>
                    <div className="muted">{m.email}</div>
                    <div style={{ textAlign: "right" }}>
                      <AnimatedButton variant="danger" size="sm" onClick={() => handleDelete(m._id)}>
                        Remove
                      </AnimatedButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </Page>
  );
}

