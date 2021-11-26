import React from "react";
import "./MainLayout.scss";
import "bootstrap";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavBar from "../NavBar";

const MainLayout = (props) => {
  const { children } = props;
  return (
    <>
      <NavBar />
      {children}
      <div className="navbar-light footer">
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://tunu.app/">
            Tunu App
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    </>
  );
};

export default MainLayout;
