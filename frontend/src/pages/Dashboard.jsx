import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Building2,
  Clock,
  Plus,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ReferralCard from "../components/ReferralCard";
import PriorityBadge from "../components/PriorityBadge";
import { getReferrals } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    loadReferrals();
  }, []);

  const loadReferrals = async () => {
    const data = await getReferrals();
    setReferrals(data);
  };

  const emergencyCount = referrals.filter(
    (r) => r.priority === "Emergency"
  ).length;

  const urgentCount = referrals.filter(
    (r) => r.priority === "Urgent"
  ).length;

  const pendingCount = referrals.filter(
    (r) =>
      r.status !== "Accepted"
  ).length;

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">
                Referral Dashboard
              </h1>

              <p className="page-description">
                Monitor and prioritize incoming medical referrals.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/referrals/new")
              }
            >
              <Plus size={17} />
              New Referral
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-label">
                  Total Referrals
                </span>

                <div className="stat-icon">
                  <Users size={19} />
                </div>
              </div>

              <div className="stat-value">
                {referrals.length}
              </div>

              <div className="stat-change">
                +12% this week
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-label">
                  Emergency
                </span>

                <div className="stat-icon">
                  <AlertTriangle size={19} />
                </div>
              </div>

              <div className="stat-value">
                {emergencyCount}
              </div>

              <div className="stat-change">
                Requires immediate attention
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-label">
                  Urgent
                </span>

                <div className="stat-icon">
                  <Activity size={19} />
                </div>
              </div>

              <div className="stat-value">
                {urgentCount}
              </div>

              <div className="stat-change">
                Priority referrals
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-label">
                  Pending
                </span>

                <div className="stat-icon">
                  <Clock size={19} />
                </div>
              </div>

              <div className="stat-value">
                {pendingCount}
              </div>

              <div className="stat-change">
                Awaiting action
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="card">
              <div className="table-header">
                <div>
                  <div className="card-title">
                    Priority Referrals
                  </div>

                  <div className="card-subtitle">
                    AI-ranked patient referrals
                  </div>
                </div>

                <button
                  className="small-btn"
                  onClick={() =>
                    navigate("/audit")
                  }
                >
                  View audit
                  <ArrowUpRight size={13} />
                </button>
              </div>

              <div className="referral-list">
                {referrals.map((referral) => (
                  <ReferralCard
                    key={referral.id}
                    referral={referral}
                  />
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-title">
                Priority Overview
              </div>

              <div className="card-subtitle">
                Current referral distribution
              </div>

              <div style={{ marginTop: "25px" }}>
                {[
                  ["Emergency", emergencyCount],
                  ["Urgent", urgentCount],
                  [
                    "High",
                    referrals.filter(
                      (r) => r.priority === "High"
                    ).length,
                  ],
                  [
                    "Medium",
                    referrals.filter(
                      (r) => r.priority === "Medium"
                    ).length,
                  ],
                ].map(([label, count]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom:
                        "1px solid #edf0f4",
                    }}
                  >
                    <PriorityBadge
                      priority={label}
                    />

                    <strong>{count}</strong>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  marginTop: "20px",
                }}
                onClick={() =>
                  navigate("/facilities")
                }
              >
                <Building2 size={16} />
                View Facilities
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;