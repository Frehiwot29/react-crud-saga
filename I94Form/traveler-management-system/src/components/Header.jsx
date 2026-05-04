import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnnouncementRequest } from "../redux/actions";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { announcement } = useSelector((state) => state.travelerState);
    useEffect(() => {
        dispatch(fetchAnnouncementRequest());
    }, [dispatch]);


    const handleAnnouncementClick = () => {
        navigate("/announcement");
    };
    let isActiveAnnouncement = true;
    if (announcement?.createdDate) {
        const createdDate = new Date(announcement.createdDate);
        const today = new Date();
        const diffInDays = (today - createdDate) / (1000 * 60 * 60 * 24);
        isActiveAnnouncement = diffInDays > 7; // Active if created within the last 7 days
    }

    return (
        <header className="header">
            <h2 className="logo">Traveler System</h2>
            <button
                className={`announcement-button ${isActiveAnnouncement ? "active" : ""}`} onClick={handleAnnouncementClick}
            >
                Announcement
            </button>


            <button className="nav-button" onClick={() => navigate("/traveler")}>
                Go to Traveler Form
            </button>
        </header>
    )
}
export default Header
