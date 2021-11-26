import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./context/AuthContext/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage";
import OutletPage from "./Pages/Outlet";
import { HOME, DASHBOARD, OUTLET, ADD_PARTNER, REDEEMED } from "./routes";
import AddPartner from "./Pages/AddPartner";
import TapedDashboard from "./Pages/Tap";

const App = () => {
  const { isAuthenticated, loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);

  console.log("Authenticated state is: ", isAuthenticated);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={HOME}>
            <HomePage />
          </Route>
          <ProtectedRoute
            path={DASHBOARD}
            isAuthenticated={isAuthenticated}
            component={DashboardPage}
          />
          <ProtectedRoute
            path={OUTLET}
            isAuthenticated={isAuthenticated}
            component={OutletPage}
          />
          <ProtectedRoute
            path={ADD_PARTNER}
            isAuthenticated={isAuthenticated}
            component={AddPartner}
          />
          <ProtectedRoute
            path={REDEEMED}
            isAuthenticated={isAuthenticated}
            component={TapedDashboard}
          />
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
