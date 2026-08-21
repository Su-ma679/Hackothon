import {
  Building2,
  MapPin,
  Bed,
  Clock,
} from "lucide-react";

function FacilityCard({ facility }) {
  return (
    <div className="facility-card">
      <div className="facility-header">
        <div className="facility-icon">
          <Building2 size={21} />
        </div>

        <span
          className={`priority-badge ${
            facility.available
              ? "priority-low"
              : "priority-emergency"
          }`}
        >
          {facility.available ? "Available" : "Limited"}
        </span>
      </div>

      <div className="facility-name">
        {facility.name}
      </div>

      <div className="facility-location">
        <MapPin size={12} style={{ verticalAlign: "middle" }} />{" "}
        {facility.location}
      </div>

      <div className="facility-info">
        <div className="facility-stat">
          <div className="facility-stat-label">
            Available Beds
          </div>

          <div className="facility-stat-value">
            <Bed size={13} /> {facility.beds}
          </div>
        </div>

        <div className="facility-stat">
          <div className="facility-stat-label">
            ETA
          </div>

          <div className="facility-stat-value">
            <Clock size={13} /> {facility.eta}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilityCard;