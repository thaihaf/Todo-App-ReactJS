import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "data",
  initialState: {
    data: [],
  },
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// const initialState = {
//   data: {},
// };

// const DataReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "data/getData": {
//       return {
//         data: action.payload,
//       };
//     }

//     default:
//       return state;
//   }
// };

// export default DataReducer;
