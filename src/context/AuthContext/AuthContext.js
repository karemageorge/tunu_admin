import { createContext } from "react";

const AuthContext = createContext({
  token: null,
  isAuthenticated: true,
  loading: true,
  user: null,
  error: null,
  loadUser: () => {},
  logOut: () => {},
  setToken: (token) => token,
});

export default AuthContext;
