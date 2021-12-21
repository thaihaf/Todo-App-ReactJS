import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function FetchClient() {
  const navigate = useNavigate();

  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
 
      return config;
    },
    function (error) {
      console.log(error);
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      if (error.response.status == 401) {
        toast.warn("This token is invalidated");
        localStorage.removeItem("user");
        navigate("/")
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
}
