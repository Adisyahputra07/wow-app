import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isSubscribe: false,
  isLogin: false,
  user: {},
  isUpdate: false,
  dataTransaction: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_SUCCESS":
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLogin: false,
      };
    case "SUBSCRIBE":
      return {
        ...state,
        isSubscribe: payload,
      };
    case "UPDATE":
      return {
        ...state,
        isUpdate: !state.isUpdate,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
};
