import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PriorityBadge from "./PriorityBadge";

function ReferralCard({ referral }) {
  const navigate = useNavigate();

  const initials = referral.patientName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="referral-card">
      <div className="referral-main">
        <div className="referral-info">
          <div className="patient-avatar">{initials}</div>

          <div>
            <div className="patient-name">
              {referral.patientName}
            </div>

            <div className="referral-meta">
              {referral.id} • {referral.age} yrs • {referral.gender}
            </div>

            <div className="referral-reason">
              {referral.reason}
            </div>
          </div>
        </div>

        <div className="referral-actions">
          <PriorityBadge priority={referral.priority} />

          <button
            className="small-btn"
            onClick={() =>
              navigate(`/referrals/${referral.id}`)
            }
          >
            <Eye size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReferralCard;