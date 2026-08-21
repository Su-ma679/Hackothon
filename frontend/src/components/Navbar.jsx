import { Bell } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div>
          <div className="navbar-brand">Referral Intelligence</div>
          <div className="navbar-subtitle">
            AI-powered medical referral prioritization
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <button className="notification-btn">
          <Bell size={18} />
        </button>

        <div className="user-info">
          <div className="avatar">DR</div>

          <div>
            <div className="user-name">Dr. Rahul Sharma</div>
            <div className="user-role">Referring Physician</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;