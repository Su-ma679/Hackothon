import { MapPin } from "lucide-react";

function MapView({ facilities = [] }) {
  return (
    <div className="map-view">
      <div className="map-road"></div>
      <div className="map-road-two"></div>

      {facilities.slice(0, 4).map((facility, index) => {
        const positions = [
          { left: "22%", top: "65%" },
          { left: "55%", top: "35%" },
          { left: "75%", top: "67%" },
          { left: "43%", top: "78%" },
        ];

        return (
          <div
            key={facility.id || index}
            className="map-pin"
            style={positions[index]}
          >
            <MapPin size={29} fill="currentColor" />

            <div
              className="map-label"
              style={{
                position: "absolute",
                top: "25px",
                left: "10px",
                whiteSpace: "nowrap",
              }}
            >
              {facility.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MapView;