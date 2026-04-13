import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
      const navigate = useNavigate();
  const location = useLocation();
    if (location.pathname === "/traveler") {
        return null;
    }

    return (
        <div className="container">
            <h2 className="title">Welcome to Traveler Management System</h2>
            <button
                className="floating-btn"
                onClick={() => navigate("/traveler")}
                title="Go to Traveler Form"
            >
                add +
            </button>
        </div>
    )
};
export default Home;