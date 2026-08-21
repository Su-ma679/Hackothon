import {
  Activity,
  Brain,
  CheckCircle,
  FileClock,
  User,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const events = [
  {
    title: "Referral priority calculated",
    time: "21 Aug 2026 • 10:32 AM",
    description:
      "AI engine assigned an Emergency priority with a score of 94/100.",
    icon: Brain,
  },
  {
    title: "Clinical information submitted",
    time: "21 Aug 2026 • 10:31 AM",
    description:
      "Patient vitals, symptoms and referral reason were submitted for analysis.",
    icon: Activity,
  },
  {
    title: "Referral created",
    time: "21 Aug 2026 • 10:30 AM",
    description:
      "New referral REF-1001 was created by Dr. Rahul Sharma.",
    icon: FileClock,
  },
  {
    title: "Physician authenticated",
    time: "21 Aug 2026 • 10:28 AM",
    description:
      "Referring physician successfully logged into the referral system.",
    icon: User,
  },
  {
    title: "System ready",
    time: "21 Aug 2026 • 10:00 AM",
    description:
      "AI prioritization engine initialized successfully.",
    icon: CheckCircle,
  },
];

function AuditTrail() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">
                Audit Trail
              </h1>

              <p className="page-description">
                Transparent record of referral system activity.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              System Activity
            </div>

            <div className="card-subtitle">
              Recent actions and AI decisions
            </div>

            <div className="audit-list">
              {events.map((event, index) => {
                const Icon = event.icon;

                return (
                  <div
                    className="audit-item"
                    key={index}
                  >
                    <div className="audit-dot">
                      <Icon
                        size={10}
                        style={{
                          color: "white",
                          position: "relative",
                          left: "1px",
                          top: "0px",
                        }}
                      />
                    </div>

                    <div className="audit-line"></div>

                    <div className="audit-content">
                      <div className="audit-title">
                        {event.title}
                      </div>

                      <div className="audit-time">
                        {event.time}
                      </div>

                      <div className="audit-description">
                        {event.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AuditTrail;