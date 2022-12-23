import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://tame-lime-alligator-slip.cyclic.app/api",
});
