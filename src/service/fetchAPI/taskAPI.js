import axios from "axios";

export default function taskAPI() {
  const createTask = async (data) => {
    let res = await axios.post("api/tasks", data);
    return res.data;
  };

  const getTasks = async (linkApi) => {
    const res = await axios.get(linkApi);
    return res.data;
  };

  const getTask = async (id) => {
    const res = await axios.get(`api/tasks/${id}`);
    return res.data;
  };

  const updateTask = async (id, data) => {
    const res = await axios.patch(`api/tasks/${id}`, data);
    return res.data;
  };

  const deleteTask = async (id) => {
    const res = await axios.delete(`api/tasks/${id}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  };

  return { createTask, getTasks, getTask, updateTask, deleteTask };
}
