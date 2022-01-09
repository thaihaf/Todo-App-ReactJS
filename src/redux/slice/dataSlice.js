import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import taskAPI from "../../untils/fetchAPI/taskAPI";

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
export const searchTasks = createAsyncThunk("data/searchTasks", async (value) => {
  try {
    const response = await taskAPI().getTasks(
      `api/tasks?limit=6&search=${value}`
    );
    return response;
  } catch (err) {
    console.log("err")
    toast.error(err.message);
  }
});

export default createSlice({
  name: "data",
  initialState: {
    data: [],
  },
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
