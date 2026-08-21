import { HeartPulse, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo login for now.
    // Backend authentication will be connected later.
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">

        {/* Logo / Branding */}
        <div className="login-brand">
          <div className="login-logo">
            <HeartPulse size={28} />
          </div>

          <div className="login-title">
            MedRefer AI
          </div>

          <div className="login-subtitle">
            Intelligent Medical Referral Prioritization
          </div>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <h2>Welcome back</h2>

          <p>
            Sign in to access your referral dashboard.
          </p>

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                Email address
              </label>

              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  style={{
                    position: "absolute",
                    left: "11px",
                    top: "11px",
                    color: "#8991a1",
                  }}
                />

                <input
                  className="form-input"
                  style={{
                    paddingLeft: "35px",
                  }}
                  type="email"
                  placeholder="doctor@hospital.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">
                Password
              </label>

              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  style={{
                    position: "absolute",
                    left: "11px",
                    top: "11px",
                    color: "#8991a1",
                  }}
                />

                <input
                  className="form-input"
                  style={{
                    paddingLeft: "35px",
                  }}
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                marginTop: "5px",
              }}
            >
              Sign in
            </button>
          </form>

          <div className="login-footer">
            Demo environment • AI referral engine active
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;