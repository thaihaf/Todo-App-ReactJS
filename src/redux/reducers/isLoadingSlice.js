import { createSlice } from "@reduxjs/toolkit";
import { isLoadingState } from "../initialState/initialState";

const isLoadingSlice = createSlice({
  name: "isLoading",
  initialState: isLoadingState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default isLoadingSlice;
