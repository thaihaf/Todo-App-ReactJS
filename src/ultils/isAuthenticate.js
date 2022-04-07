import store from "../redux/store";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const user = store?.getState()?.user?.user;
  const isAuthenticated = !!user?.token;

  return isAuthenticated;
};
