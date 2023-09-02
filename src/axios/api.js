import axios from "axios";

const api = axios.create({
   baseURL: "https://103-webdev-job-test.cyclic.cloud",
});

api.interceptors.request.use((config) => {
   const token = localStorage.getItem("userToken");

   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
});

export default api;
