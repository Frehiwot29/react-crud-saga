import axios from "axios";

export const fetchAnnouncementApi = () => axios.get("http://localhost:8080/api/announcement");