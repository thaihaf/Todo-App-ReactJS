import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  //IMMER
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }, // Action Creator
  },
});
