import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingTravelerButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Hide button on Traveler page
  if (location.pathname === "/traveler") {
    return null;
  }

  return (
    <button
      className="floating-btn"
      onClick={() => navigate("/traveler")}
      title="Go to Traveler Form"
    >
      add +
    </button>
  );
};

export default FloatingTravelerButton;