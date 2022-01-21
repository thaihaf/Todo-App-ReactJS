import axios from "axios";
import { toast } from "react-toastify";
import store from "../redux/store";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  let headers = {};
  const user = store.getState()?.user?.user;
  if (user) {
    headers.Authorization = `Bearer ${user.token}`;
  }

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      const status = error.response.status;
      switch (status) {
        // Authen
        case 401: {
          localStorage.clear();
          window.location.reload();
          toast.error("Token not acceept authorization");
          break;
        }
        // Many Request
        case 429: {
          // window.location.assign("/");
          toast.error("To many request, wait 10 second and auto refresh");
          store.

          setTimeout(() => {
            window.location.reload();
          }, 10000);
          break;
        }
        default: {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
      }
    }
  );

  return axiosInstance;
};
