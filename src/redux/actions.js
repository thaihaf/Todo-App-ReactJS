// Data
export const getData = (data) => {
  return {
    type: "tasks/getData",
    payload: data,
  };
};
// Categories
export const getCategories = (data) => {
  return {
    type: "tasks/getCategories",
    payload: data,
  };
};

// users
export const setUser = (data) => {
  return {
    type: "users/setUser",
    payload: data,
  };
};
