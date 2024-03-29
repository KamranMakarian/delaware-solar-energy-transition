import React from "react";
import "./LegendIcon.css";

function LegendIcon() {
  const renderIcon = (color) => (
    <svg width="100" height="100" viewBox="0 0 60 100" style={{verticalAlign: "middle"}}>
      <line x1="42" y1="50" x2="20" y2="50" stroke={color} strokeWidth="2" />
      <line x1="57" y1="50" x2="79" y2="50" stroke={color} strokeWidth="2" />
      <circle
        cx="50"
        cy="50"
        r="8"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <div className="legend-icons-container">
      <h2>Legend:</h2>
      <h3>Historical Data {renderIcon("#4B0082")} </h3>
      <h3> Predicted Data {renderIcon("#006400")}</h3>
    </div>
  );
}

export default LegendIcon;
