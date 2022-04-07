import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userState } from "../initialState/initialState";
import { toast } from "react-toastify";
import userAPI from "../../ultils/fetchAPI/userAPI";

export const handleLogin = createAsyncThunk(
  "user/handleLogin",
  async (data) => {
    try {
      let userTemp = await userAPI().login({
        username: data.username,
        password: data.password,
      });

      toast.success("🦄 Loggin successfully!");
      localStorage.setItem("accepted", new Date().getTime());

      return userTemp;
    } catch (error) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  //IMMER
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }, // Action Creator
  },
  extraReducers: {
    [handleLogin.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [handleLogin.rejected]: (state) => {
      state.user = [];
    },
  },
});

export default userSlice;
