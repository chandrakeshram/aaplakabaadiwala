import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});

// Example endpoints
export const fetchRates = (pincode) => API.get(`/rates?pincode=${pincode}`);
export const bookPickup = (data) => API.post("/pickups", data);

export default API;
