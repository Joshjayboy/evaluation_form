// hooks/useTasks.js
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "./constant.js";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = async (taskData) => {
    const res = await axios.post(`${baseURL}/save`, taskData);
    setUpdateUI((prev) => !prev);
    return res.data;
  };

  const updateTask = (id, updatedData) => {
    return axios.put(`${baseURL}/update/${id}`, updatedData).then((res) => {
      setUpdateUI((prev) => !prev);
    });
  };

  const deleteTask = async (id) => {
    await axios.delete(`${baseURL}/delete/${id}`);
    setUpdateUI((prev) => !prev);
  };

  return { tasks, addTask, updateTask, deleteTask };
};
