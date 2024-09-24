import axios from "axios";
import { API_URL } from "../constant";

// create an axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// request interceptor
api.interceptors.request.use(
  async (config) => {
    const authData = localStorage.getItem("businessAuthInfo"); // Get the stored object
    if (authData) {
      const tokenObject = JSON.parse(authData); // Parse the object
      if (tokenObject.token) {
        config.headers.Authorization = `Bearer ${tokenObject.token}`; // Attach the token
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// create an axios instance
export const formDataApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  },
});

// request interceptor
formDataApi.interceptors.request.use(
  async (config) => {
    const authData = localStorage.getItem("businessAuthInfo"); // Get the stored object
    if (authData) {
      const tokenObject = JSON.parse(authData); // Parse the object
      if (tokenObject.token) {
        config.headers.Authorization = `Bearer ${tokenObject.token}`; // Attach the token
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
