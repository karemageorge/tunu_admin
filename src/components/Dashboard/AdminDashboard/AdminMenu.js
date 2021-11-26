import React from "react";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { DASHBOARD, OUTLET, ADD_PARTNER } from "../../../routes";

const useStyles = makeStyles({
  menu: {
    width: "100%",
    padding: "1em",
    textDecoration: "none",
    marginLeft: "1em",
    fontWeight: "bolder",
    letterSpacing: "2px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ecf0f1",
  },
});

const AdminMenu = () => {
  const classes = useStyles();
  return (
    <CardActions className={classes.wrapper}>
      <Link className={classes.menu} to={DASHBOARD}>
        Home
      </Link>

      <Link className={classes.menu} to={OUTLET}>
        Outlet
      </Link>

      <Link className={classes.menu} to={ADD_PARTNER}>
        Add Partner
      </Link>
    </CardActions>
  );
};
export default AdminMenu;
