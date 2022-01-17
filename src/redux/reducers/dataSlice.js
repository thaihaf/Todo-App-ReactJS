import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import taskAPI from "../../ultils/fetchAPI/taskAPI";
import { dataState } from "../initialState/initialState";

export const getData = createAsyncThunk("data/getData", async (link) => {
  try {
    const response = await taskAPI().getTasks(
      link ? link : `api/tasks?limit=6`
    );
    return response;
  } catch (err) {
    toast.error(err.message);
  }
});
export const searchTasks = createAsyncThunk(
  "data/searchTasks",
  async (value) => {
    try {
      const response = await taskAPI().getTasks(
        `api/tasks?limit=6&search=${value}`
      );
      return response;
    } catch (err) {
      console.log("err");
      toast.error(err.message);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: dataState,
  reducers: {},
  extraReducers: {
    [getData.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getData.rejected]: (state) => {
      state.data = [];
    },
    [searchTasks.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [searchTasks.rejected]: (state) => {
      state.data = [];
    },
  },
});

export default dataSlice;
