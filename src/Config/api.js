import axios from "axios";

export const API_BASE_URL = "http://localhost:9001";

const jwt = localStorage.getItem("vv-jwt");

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  },
});
