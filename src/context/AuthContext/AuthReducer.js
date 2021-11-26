import { USER_LOGOUT, USER_LOADED, SET_TOKEN, AUTH_ERROR } from "./types";

export default (state, { type, payload }) => {
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
        error: null,
      };
    case SET_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: true,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: "Something went wrong",
      };

    case USER_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
