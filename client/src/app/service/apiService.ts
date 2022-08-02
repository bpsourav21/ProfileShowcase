import axios from "axios";
import { getAuthToken } from "../helpers/storage";

const API_ENDPOINT = process.env.API_ENDPOINT || "http://35.201.2.209:8000/";

const apiService = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use((request) => {
  const authToken = getAuthToken();
  if (authToken) {
    request.headers!["Authorization"] = `Bearer ${authToken}`;
  }
  return request;
});

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export default apiService;
