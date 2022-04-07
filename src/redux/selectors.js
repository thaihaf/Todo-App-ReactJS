// import { createSelector } from "@reduxjs/toolkit";

export const isLoadingSelector = (state) => state.isLoading.isLoading;
export const userSelector = (state) => state.user.user;
export const dataSelector = (state) => state.data.data;
export const categoriesSelector = (state) => state.categories.categories;

// export const dataRemaining = createSelector(
//   dataSelector,
//   categoriesSelector,
//   (data, categories) => {
//     return data.items.map((item) => {
//       return item.categories.filter((category) => category.name == "music");
//     });
//   }
// );
