import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://pharma-blog-app.herokuapp.com/api/",
});
