const initialState = {
  token: "",
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_ACTION":
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
