import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewReferral from "./pages/NewReferral";
import ReferralDetails from "./pages/ReferralDetails";
import Facilities from "./pages/Facilities";
import AuditTrail from "./pages/AuditTrail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/referrals/new" element={<NewReferral />} />

        <Route
          path="/referrals/:id"
          element={<ReferralDetails />}
        />

        <Route path="/facilities" element={<Facilities />} />

        <Route path="/audit" element={<AuditTrail />} />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;