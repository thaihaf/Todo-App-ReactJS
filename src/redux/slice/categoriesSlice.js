import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import collectionAPI from "../../untils/fetchAPI/collectionsAPI";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    try {
      const response = await collectionAPI().getCollections(
        "api/categories?limit=8"
      );
      return response.items;
    } catch (err) {
      toast.error(err.message);
    }
  }
);

export default createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [getCategories.rejected]: (state, action) => {
      state.categories = [];
    },
  },
});
