import {
  LayoutDashboard,
  PlusCircle,
  Building2,
  ClipboardList,
  FileClock,
  LogOut,
  HeartPulse,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "New Referral",
      path: "/referrals/new",
      icon: PlusCircle,
    },
    {
      name: "Facilities",
      path: "/facilities",
      icon: Building2,
    },
    {
      name: "Audit Trail",
      path: "/audit",
      icon: FileClock,
    },
  ];

  const logout = () => {
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <HeartPulse size={21} />
        </div>

        <div className="logo-text">
          MedRefer AI
          <span>Referral Intelligence</span>
        </div>
      </div>

      <div className="sidebar-section-title">Navigation</div>

      {links.map((link) => {
        const Icon = link.icon;

        return (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={18} />
            <span>{link.name}</span>
          </NavLink>
        );
      })}

      <div className="sidebar-bottom">
        <div className="sidebar-status">
          <span className="status-dot"></span>
          AI Engine Online
        </div>

        <button
          className="sidebar-link"
          onClick={logout}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            marginTop: "10px",
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;