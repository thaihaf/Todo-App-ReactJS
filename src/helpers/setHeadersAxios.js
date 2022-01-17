import axios from "axios";

export default function setAuthToken(token) {
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";
}
