import axios from "axios";

// create an axios instance
const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export default request;
