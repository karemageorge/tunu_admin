import React, { useReducer } from "react";
import axios from "axios";
import AuthReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import { USER_LOGOUT, USER_LOADED, AUTH_ERROR, SET_TOKEN } from "./types";

const AuthState = (props) => {
  const { children } = props;

  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: true,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Log out user
  const logOut = () => {
    dispatch({ type: USER_LOGOUT });
  };

  // Load user
  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_API}/user/tap/login`,
        {
          headers: { Authorization: token },
        }
      );
      console.log("USER ISSS is: ", res.data.data);
      dispatch({
        type: USER_LOADED,
        payload: res.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // Set token
  const setToken = (token) => {
    console.log("About to set token");
    console.log("Token is: ", token);
    localStorage.setItem("token", token);

    dispatch({
      type: SET_TOKEN,
    });
    loadUser();
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        loadUser,
        logOut,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
