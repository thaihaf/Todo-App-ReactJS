import axios from "axios";

export default function setAuthToken(token) {
  axios.defaults.baseURL = "https://mvn-task-manager.work/";

  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";
}
