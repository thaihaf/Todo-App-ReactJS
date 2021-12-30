import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import taskAPI from "../../service/fetchAPI/taskAPI";

export const getData = createAsyncThunk("data/getData", async () => {
  try {
    const response = await taskAPI().getTasks(`api/tasks?limit=6`);
    return response;
  } catch (err) {
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
  },
});
