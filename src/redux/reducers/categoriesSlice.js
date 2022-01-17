import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import collectionAPI from "../../ultils/fetchAPI/collectionsAPI";
import { categoriesState } from "../initialState/initialState";

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

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesState,
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

export default categoriesSlice
