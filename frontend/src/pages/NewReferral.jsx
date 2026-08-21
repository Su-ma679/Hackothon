import {
  ArrowLeft,
  Brain,
  CheckCircle,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PriorityBadge from "../components/PriorityBadge";
import { createReferral } from "../services/api";

function NewReferral() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    department: "",
    reason: "",
    symptoms: "",
    heartRate: "",
    bloodPressure: "",
    oxygen: "",
    temperature: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const referral = await createReferral(form);
      setResult(referral);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate("/dashboard");
  };

  if (result) {
    return (
      <div className="app-layout">
        <Sidebar />

        <div className="main-area">
          <Navbar />

          <main className="page-content">
            <div className="page-header">
              <div>
                <h1 className="page-title">
                  Referral Created
                </h1>

                <p className="page-description">
                  AI has analyzed the referral and assigned
                  a priority.
                </p>
              </div>
            </div>

            <div className="card" style={{ maxWidth: "750px", margin: "0 auto" }}>
              <div
                style={{
                  textAlign: "center",
                  padding: "25px",
                }}
              >
                <CheckCircle
                  size={55}
                  color="#16a34a"
                />

                <h2
                  style={{
                    marginTop: "14px",
                  }}
                >
                  Referral successfully created
                </h2>

                <p
                  style={{
                    color: "#8991a1",
                    marginTop: "6px",
                  }}
                >
                  Referral ID: {result.id}
                </p>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "12px",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: "#8991a1",
                    fontSize: "12px",
                  }}
                >
                  AI PRIORITY
                </div>

                <div style={{ marginTop: "10px" }}>
                  <PriorityBadge
                    priority={result.priority}
                  />
                </div>

                <div
                  style={{
                    fontSize: "40px",
                    fontWeight: "800",
                    marginTop: "12px",
                  }}
                >
                  {result.score}
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#8991a1",
                    }}
                  >
                    /100
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  paddingTop: "20px",
                }}
              >
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    navigate("/dashboard")
                  }
                >
                  Dashboard
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/referrals/${result.id}`)
                  }
                >
                  View Referral
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                onClick={goBack}
                style={{ marginBottom: "14px" }}
              >
                <ArrowLeft size={15} />
                Back
              </button>

              <h1 className="page-title">
                New Medical Referral
              </h1>

              <p className="page-description">
                Enter patient information for AI-powered
                prioritization.
              </p>
            </div>
          </div>

          <form
            className="form-card"
            onSubmit={handleSubmit}
          >
            <div className="alert alert-info">
              <Brain
                size={15}
                style={{
                  verticalAlign: "middle",
                  marginRight: "6px",
                }}
              />
              The AI engine will evaluate clinical indicators,
              symptoms and vital signs to calculate referral
              priority.
            </div>

            <div className="form-section">
              <div className="form-section-title">
                Patient Information
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Patient Name
                  </label>

                  <input
                    className="form-input"
                    name="patientName"
                    value={form.patientName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Age
                  </label>

                  <input
                    className="form-input"
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Gender
                  </label>

                  <select
                    className="form-select"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select gender
                    </option>

                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Department
                  </label>

                  <select
                    className="form-select"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select department
                    </option>

                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Gastroenterology</option>
                    <option>Nephrology</option>
                    <option>Pulmonology</option>
                    <option>General Medicine</option>
                    <option>Emergency Medicine</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">
                Clinical Information
              </div>

              <div className="form-grid">
                <div className="form-group full">
                  <label className="form-label">
                    Primary Reason for Referral
                  </label>

                  <textarea
                    className="form-textarea"
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    placeholder="Describe why the patient requires referral..."
                    required
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">
                    Symptoms
                  </label>

                  <textarea
                    className="form-textarea"
                    name="symptoms"
                    value={form.symptoms}
                    onChange={handleChange}
                    placeholder="Describe patient's symptoms..."
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">
                Vital Signs
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Heart Rate (BPM)
                  </label>

                  <input
                    className="form-input"
                    type="number"
                    name="heartRate"
                    value={form.heartRate}
                    onChange={handleChange}
                    placeholder="e.g. 110"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Blood Pressure
                  </label>

                  <input
                    className="form-input"
                    name="bloodPressure"
                    value={form.bloodPressure}
                    onChange={handleChange}
                    placeholder="e.g. 120/80"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Oxygen Saturation (%)
                  </label>

                  <input
                    className="form-input"
                    type="number"
                    name="oxygen"
                    value={form.oxygen}
                    onChange={handleChange}
                    placeholder="e.g. 95"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Temperature (°C)
                  </label>

                  <input
                    className="form-input"
                    type="number"
                    step="0.1"
                    name="temperature"
                    value={form.temperature}
                    onChange={handleChange}
                    placeholder="e.g. 37.2"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={goBack}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                <Brain size={16} />
                {loading
                  ? "Analyzing..."
                  : "Analyze & Create Referral"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default NewReferral;