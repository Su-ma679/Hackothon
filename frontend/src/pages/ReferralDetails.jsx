import {
  ArrowLeft,
  Brain,
  CheckCircle,
  Clock,
  HeartPulse,
  MapPin,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PriorityBadge from "../components/PriorityBadge";
import ScoreBreakdown from "../components/ScoreBreakdown";
import MapView from "../components/MapView";

import {
  getReferralById,
  getFacilities,
} from "../services/api";

function ReferralDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [referral, setReferral] = useState(null);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    const referralData = await getReferralById(id);
    const facilityData = await getFacilities();

    setReferral(referralData);
    setFacilities(facilityData);
  };

  if (!referral) {
    return (
      <div className="login-page">
        Loading referral...
      </div>
    );
  }

  const breakdown = [
    {
      label: "Vital signs",
      score: referral.score >= 80 ? 92 : 65,
    },
    {
      label: "Symptoms severity",
      score: referral.score >= 80 ? 89 : 70,
    },
    {
      label: "Patient age",
      score: referral.age >= 65 ? 85 : 55,
    },
    {
      label: "Clinical urgency",
      score: referral.score,
    },
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  navigate("/dashboard")
                }
                style={{ marginBottom: "13px" }}
              >
                <ArrowLeft size={15} />
                Back to Dashboard
              </button>

              <h1 className="page-title">
                Referral {referral.id}
              </h1>

              <p className="page-description">
                Detailed clinical information and AI
                prioritization analysis.
              </p>
            </div>

            <PriorityBadge
              priority={referral.priority}
            />
          </div>

          <div className="details-grid">
            <div>
              <div className="card">
                <div className="card-title">
                  Patient Information
                </div>

                <div className="detail-row">
                  <span className="detail-label">
                    Patient
                  </span>

                  <span className="detail-value">
                    {referral.patientName}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">
                    Age / Gender
                  </span>

                  <span className="detail-value">
                    {referral.age} / {referral.gender}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">
                    Department
                  </span>

                  <span className="detail-value">
                    {referral.department}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">
                    Referral Reason
                  </span>

                  <span className="detail-value">
                    {referral.reason}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">
                    Referring Doctor
                  </span>

                  <span className="detail-value">
                    {referral.referringDoctor}
                  </span>
                </div>
              </div>

              <div
                className="card"
                style={{ marginTop: "20px" }}
              >
                <div className="card-title">
                  Vital Signs
                </div>

                <div className="facility-info">
                  <div className="facility-stat">
                    <div className="facility-stat-label">
                      Heart Rate
                    </div>

                    <div className="facility-stat-value">
                      <HeartPulse size={14} />{" "}
                      {referral.vitals.heartRate} BPM
                    </div>
                  </div>

                  <div className="facility-stat">
                    <div className="facility-stat-label">
                      Blood Pressure
                    </div>

                    <div className="facility-stat-value">
                      {referral.vitals.bloodPressure}
                    </div>
                  </div>

                  <div className="facility-stat">
                    <div className="facility-stat-label">
                      Oxygen
                    </div>

                    <div className="facility-stat-value">
                      {referral.vitals.oxygen}%
                    </div>
                  </div>

                  <div className="facility-stat">
                    <div className="facility-stat-label">
                      Temperature
                    </div>

                    <div className="facility-stat-value">
                      {referral.vitals.temperature}°C
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="card"
                style={{ marginTop: "20px" }}
              >
                <div className="card-title">
                  Recommended Facilities
                </div>

                <div className="card-subtitle">
                  AI-matched facilities based on urgency,
                  distance and availability.
                </div>

                <div style={{ marginTop: "18px" }}>
                  <MapView
                    facilities={facilities}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="card">
                <div className="card-title">
                  AI Priority Analysis
                </div>

                <div className="card-subtitle">
                  Explainable referral prioritization
                </div>

                <div className="score-container">
                  <div className="score-circle">
                    <div className="score-number">
                      {referral.score}
                    </div>

                    <div className="score-label">
                      AI SCORE
                    </div>
                  </div>

                  <div style={{ marginTop: "15px" }}>
                    <PriorityBadge
                      priority={referral.priority}
                    />
                  </div>
                </div>

                <ScoreBreakdown
                  breakdown={breakdown}
                />

                <div
                  className="alert alert-info"
                  style={{ marginTop: "20px" }}
                >
                  <Brain
                    size={14}
                    style={{
                      verticalAlign: "middle",
                      marginRight: "5px",
                    }}
                  />

                  AI score is based on clinical urgency,
                  vital signs, symptoms and patient factors.
                </div>
              </div>

              <div
                className="card"
                style={{ marginTop: "20px" }}
              >
                <div className="card-title">
                  Referral Status
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    marginTop: "18px",
                  }}
                >
                  <CheckCircle
                    size={22}
                    color="#16a34a"
                  />

                  <div>
                    <div
                      style={{
                        fontWeight: "700",
                        fontSize: "13px",
                      }}
                    >
                      {referral.status}
                    </div>

                    <div
                      style={{
                        color: "#8991a1",
                        fontSize: "11px",
                        marginTop: "3px",
                      }}
                    >
                      Created {referral.createdAt}
                    </div>
                  </div>
                </div>

                <div
                  className="detail-row"
                  style={{ marginTop: "10px" }}
                >
                  <span className="detail-label">
                    <MapPin
                      size={13}
                      style={{
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Facility
                  </span>

                  <span className="detail-value">
                    {referral.facility}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">
                    <Clock
                      size={13}
                      style={{
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Created
                  </span>

                  <span className="detail-value">
                    {referral.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ReferralDetails;