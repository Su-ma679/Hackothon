import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FacilityCard from "../components/FacilityCard";
import MapView from "../components/MapView";

import { getFacilities } from "../services/api";

function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    const data = await getFacilities();
    setFacilities(data);
  };

  const filteredFacilities = facilities.filter(
    (facility) =>
      facility.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      facility.location
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">
                Healthcare Facilities
              </h1>

              <p className="page-description">
                Monitor facility availability and referral
                destinations.
              </p>
            </div>
          </div>

          <div
            className="card"
            style={{ marginBottom: "20px" }}
          >
            <div
              style={{
                position: "relative",
              }}
            >
              <Search
                size={17}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "11px",
                  color: "#8991a1",
                }}
              />

              <input
                className="form-input"
                style={{
                  width: "100%",
                  paddingLeft: "38px",
                }}
                placeholder="Search facilities or locations..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>

          <div
            className="card"
            style={{ marginBottom: "20px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "15px",
              }}
            >
              <SlidersHorizontal size={17} />

              <div className="card-title">
                Facility Map
              </div>
            </div>

            <MapView facilities={facilities} />
          </div>

          <div className="facility-grid">
            {filteredFacilities.map(
              (facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                />
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Facilities;