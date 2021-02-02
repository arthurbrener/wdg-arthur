import axios from "axios";

const tokenHeader = (store) => {
  return {
    headers: {
      token: store.getState().clickState.token,
    },
  };
};

export const login = (userData) => {
  return axios
    .post(`https://reqres.in/api/login?delay=2`, userData)
    .catch(() => null);
};

export const getUserList = (page = 1, store) => {
  return axios.get(
    `https://reqres.in/api/users?page=${page}&delay=2`,
    tokenHeader(store)
  );
};

export const getUserById = (id, store) => {
  return axios
    .get(`https://reqres.in/api/users/${id}?delay=2`, tokenHeader(store))
    .catch((error) => error.response.status);
};

export const updateUserById = (userData, store) => {
  return axios.put(
    `https://reqres.in/api/users/${userData.id}?delay=2`,
    {
      first_name: userData.first_name,
      last_name: userData.last_name,
    },
    tokenHeader(store)
  );
};

export const deleteUserById = (id, store) => {
  return axios.delete(
    `https://reqres.in/api/users/${id}?delay=2`,
    tokenHeader(store)
  );
};
