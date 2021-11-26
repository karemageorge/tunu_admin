import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as routes from "./index";

const ProtectedRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = (props) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: `${routes.HOME}` }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default ProtectedRoute;
