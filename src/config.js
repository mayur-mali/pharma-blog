import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://pharmacy-blog-server.onrender.com/api",
});
