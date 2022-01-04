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

// const initialState = {
//   user: {},
// };

// const UserReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "users/setUser": {
//       return {
//         user: action.payload,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export default UserReducer;
