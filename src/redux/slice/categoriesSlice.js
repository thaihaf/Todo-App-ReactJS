import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload;
    } /*  => { type : "categories/getCategories" } */,
  },
});

// const initialState = {
//   categories: [],
// };

// const CategoriesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "categories/getCategories": {
//       return {
//         categories: action.payload,
//       };
//     }

//     default:
//       return state;
//   }
// };

// export default CategoriesReducer;
