export const getToken = () => {
  return window.localStorage.getItem("token");
};

export const setToken = (token) => {
  window.localStorage.setItem("token", token);
};

export const removeToken = () => {
  window.localStorage.removeItem("token");
};

export const getId = () => {
  return window.localStorage.getItem("id");
};

export const setId = (id) => {
  window.localStorage.setItem("id", id);
};

export const removeId = () => {
  window.localStorage.removeItem("id");
};
