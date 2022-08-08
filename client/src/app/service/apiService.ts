import axios from "axios";

const API_ENDPOINT = process.env.PUBLIC_URL || "http://localhost:3001";
const baseURL = API_ENDPOINT + "/api/";

const apiService = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiService;
