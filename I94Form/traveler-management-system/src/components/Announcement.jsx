import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnnouncementSuccess} from "../redux/actions";

const Announcement = () => {
  const dispatch = useDispatch();

  const { announcements, loading, error } = useSelector((state) => state.travelerState);

  useEffect(() => {
    dispatch(fetchAnnouncementSuccess());
  }, [dispatch]);

  return (
    <div className="page-container">
      <div className="announcement-card">
        <h2 className="title">New Immigrants Arrival</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {announcements?.map((item) => (
          <div key={item.id} className="announcement-item">
            <h3>
              {item.fname} {item.lname}
            </h3>

            <p>Passport: {item.passportNumber}</p>
            <p>Visa: {item.visaType}</p>

            {/* Special Highlight */}
            {item.category === "WORLD_CUP_PLAYER" && (
              <span className="badge">⚽ World Cup Player</span>
            )}

            <small>
              {new Date(item.createdDate).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;