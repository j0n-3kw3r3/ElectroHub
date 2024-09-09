import axios from 'axios';

// create an axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
});

// request interceptor
api.interceptors.request.use(
  async config => {
    const authData = localStorage.getItem("businessAuthInfo"); // Get the stored object
   if (authData) {
     const tokenObject = JSON.parse(authData); // Parse the object
     if (tokenObject.token) {
       config.headers.Authorization = `Bearer ${tokenObject.token}`; // Attach the token
     }
   }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
