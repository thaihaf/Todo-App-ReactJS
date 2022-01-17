import axiosInstance from "../../helpers/axios";

export default function userAPI() {
  const axios = axiosInstance();

  const register = async (details) => {
    let res = await axios.post("auth/register", details);
    return res.data;
  };

  const login = async (details) => {
    let res = await axios.post("auth/login", details);
    return res.data;
  };

  const getUser = async (id) => {
    const res = await axios.get(`api/users/${id}`);
    return res.data;
  };

  const updateUser = async (id, details) => {
    const res = await axios.patch(`api/users/${id}`, details);
    return res.data;
  };

  const deleteUser = async (id) => {
    const res = await axios.delete(`api/users/${id}`);
    return res.data;
  };

  return { register, login, getUser, updateUser, deleteUser };
}
